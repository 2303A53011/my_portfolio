# Review & Deep Dive: TryHackMe SOC Level 1 Learning Path

I recently completed the **SOC Level 1 Learning Path** on TryHackMe, and it was an incredible journey validating core Blue Team operations. 

Here is my comprehensive review of the path, including the critical skills, defensive tools, and practical methodologies I mastered along the way.

---

## 1. Path Overview

The path covers six major areas of security defense:
1. **Cyber Defense Frameworks:** MITRE ATT&CK, Unified Kill Chain, and Diamond Model.
2. **Cyber Threat Intelligence (CTI):** OSINT, Yara, OpenCTI, and MISP.
3. **Network Security Monitoring:** Snort, Zeek, Wireshark, and Brim.
4. **Endpoint Security Monitoring:** Sysmon, OSQuery, and Windows/Linux event logs.
5. **SIEM (Security Information and Event Management):** Splunk and Wazuh analytics.
6. **Digital Forensics & Incident Response (DFIR):** Volatility, Autopsy, and Incident Response Playbooks.

---

## 2. Deep Dive: Key Tools and Labs

### A. SIEM Engineering (Splunk & Wazuh)
One of the most practical sections was querying logs to reconstruct attacker behavior. 

In the Splunk labs, we investigated a brute force attack on a web portal. By correlating event codes and source IPs, I tracked the transition from multiple failed login attempts to a successful login, followed by privilege escalation commands.

#### Query Practice: Detecting Brute Force in Splunk
```spl
index=main sourcetype="win_event_logs" EventCode=4625
| stats count BY src_ip, user
| where count > 15
```
Once the successful login was found (EventCode `4624`), we pivoted to monitor process execution:
```spl
index=main sourcetype="win_event_logs" EventCode=4688 Image="*whoami.exe" OR Image="*nltest.exe"
```

In the **Wazuh** labs, I configured active response rules to automatically block rogue IPs trying to SSH brute force our host, simulating automation workflows in an enterprise SOC.

---

### B. Network Traffic Analysis (Wireshark & Snort)
Packet analysis is a core competency for any security analyst. In this section, we investigated PCAPs containing web exploits and ransomware callbacks.

Key Wireshark filters used:
- **Locating Cleartext Credentials:** `http.request.method == "POST"`
- **Filtering for DNS Exfiltration:** `dns.flags.response == 0 && dns.qry.name matches "^[a-f0-9]{32}\.exfil\.com$"`
- **Tracking TCP Handshakes:** `tcp.flags.syn == 1 && tcp.flags.ack == 0`

We also wrote **Snort rules** to detect SQL injections and reverse shells, learning how IDS rules can trigger alerts or drop malicious traffic.

---

## 3. Cyber Defense Frameworks in Action

Understanding *how* to categorize attacks is just as important as finding them. The path deeply integrated the **MITRE ATT&CK** framework, teaching us to map alerts to specific techniques.

For example, when seeing a process dump `lsass.exe` using procdump:
- **Tactic:** Credential Access (TA0006)
- **Technique:** OS Credential Dumping (T1003)
- **Sub-technique:** LSASS Memory (T1003.001)

This taxonomy makes it possible to write structured incident reports and evaluate defensive coverage gaps.

---

## 4. Final Verdict

### Who is this path for?
- Aspiring Security Analysts (Tier 1 SOC)
- Students wanting hands-on practice rather than just theoretical certifications
- IT professionals transitioning into cybersecurity

### My Takeaway
The path is highly practical. It doesn't just ask you to answer multiple-choice questions; you are given active VMs to configure dashboards, write rules, analyze log outputs, and investigate memory dumps. 

Completing this path has given me the confidence to design my own **Enterprise SOC Lab** and build automated detection rules!
