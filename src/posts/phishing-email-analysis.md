# Phishing Email Analysis: When SPF, DKIM & DMARC All Pass — And It's Still a Phish

Most SOC analysts are taught to trust the "green checkmarks" — if SPF passes, DKIM validates, and DMARC aligns, the email is legitimate. This investigation dismantles that assumption using a real-world phishing sample that sailed past every standard email authentication gate.

In this writeup, we perform a full SOC-style triage on an archived phishing email (PHISH-2075), walk through header forensics, decode a multi-hop redirect chain, extract IOCs, and map the attack to MITRE ATT&CK.

---

## 1. The Sample: Fake MetaMask Password Reset

The phishing email (`sample-2075.eml`) arrived on **2 December 2023**, impersonating **MetaMask Support**. The subject line — "Reset Your Password Immediately" — is a classic urgency-driven social engineering lure designed to bypass the recipient's critical thinking.

```
From: Liam From Metamask TS <support@vvauc.zendesk.com>
Reply-To: support+id177949@vvauc.zendesk.com
To: Rodrigo-f-p <phishing@pot>
Subject: Reset Your Password Immediately
Date: Sat, 02 Dec 2023 11:21:37 +0000
X-Mailer: Zendesk Mailer
```

At first glance, the email headers look clean. The `X-Mailer` field shows it was sent through Zendesk's legitimate email infrastructure — not a spoofed server or a compromised relay.

---

## 2. Authentication Results: All Green, All Lies

Here's the critical finding. Every standard email authentication check **passed**:

```
Authentication-Results:
  spf=pass (sender IP is 192.161.151.2)
    smtp.mailfrom=vvauc.zendesk.com;
  dkim=pass (signature was verified)
    header.d=zendesk.com;
  dmarc=pass action=none
    header.from=vvauc.zendesk.com;
  compauth=pass reason=100
```

### Why Everything Passed

The attacker didn't spoof anything. Instead, they **registered a free Zendesk help-desk account** (`vvauc.zendesk.com`) and used Zendesk's own sending infrastructure to deliver the phishing email.

- **SPF passed** because `192.161.151.2` (`outbyoip2.pod13.usw2.zdsys.com`) is a legitimate Zendesk outbound mail server, authorized in Zendesk's SPF record.
- **DKIM passed** because Zendesk signs all outbound mail with its own `zendesk.com` domain key (`s=zendesk1`), and the signature verified cleanly.
- **DMARC passed** because the `From:` domain (`vvauc.zendesk.com`) aligned with Zendesk's DMARC policy.

This technique is known as **platform abuse** — weaponizing a legitimate SaaS platform's email infrastructure to inherit its sender reputation. The email effectively "launders" its trust through Zendesk.

---

## 3. Header Forensics: Tracing the Delivery Path

Walking the `Received:` headers bottom-to-top reveals the complete delivery chain:

```
1. zendesk.com (internal: 10.210.98.77)
   → outbyoip2.pod13.usw2.zdsys.com (192.161.151.2)       [Zendesk outbound]

2. outbyoip2.pod13.usw2.zdsys.com
   → AM4PEPF00027A62.mail.protection.outlook.com           [Microsoft EOP]

3. AM4PEPF00027A62 (Frontend Transport)
   → AS4P190CA0064.outlook.office365.com                   [O365 routing]

4. SJ0P223MB0616.NAMP223.PROD.OUTLOOK.COM                 [Recipient mailbox server]
   → LV3P223MB0968.NAMP223.PROD.OUTLOOK.COM                [Final delivery via HTTPS]
```

**Key observations:**
- The originating IP `192.161.151.2` is a known Zendesk outbound server — not a compromised host.
- Microsoft's Exchange Online Protection (EOP) processed the message with `SCL=1` (low spam confidence) and `BCL=0` (zero bulk complaint level), confirming the email was treated as legitimate by automated defenses.
- The `Auto-Submitted: auto-generated` header confirms this was a system-triggered email from Zendesk's ticketing pipeline.

---

## 4. The Redirect Chain: Bing as a Laundering Hop

The phishing payload — the "Reset Password" button — doesn't link directly to the credential-harvesting page. Instead, it routes through a **legitimate Bing click-tracking redirector**:

```
Step 1: User clicks "Reset Password"
   → https://www.bing.com/ck/a?!&&p=...&u=a1aHR0cHM6Ly93d3cuZG...

Step 2: Bing redirector decodes base64 parameter
   → Redirects to compromised domain (credential-harvesting page)

Step 3: Victim lands on fake MetaMask login page
   → Credentials captured by attacker
```

This multi-hop redirect chain serves two purposes:
1. **Reputation laundering**: Link-scanning tools see a `bing.com` URL and classify it as safe.
2. **Evasion**: The final destination is obfuscated inside a base64-encoded parameter, defeating simple URL pattern matching.

---

## 5. IOC Extraction

| IOC Type | Value | Context |
|---|---|---|
| Sender Domain | `vvauc.zendesk.com` | Attacker-controlled Zendesk subdomain |
| Sender IP | `192.161.151.2` | Zendesk outbound relay (legitimate infra) |
| Reply-To | `support+id177949@vvauc.zendesk.com` | Zendesk ticket routing address |
| Zendesk Account ID | `ad431af` | `X-Zendesk-From-Account-Id` header value |
| DKIM Selector | `zendesk1` | Zendesk's DKIM signing key |
| Redirect Domain | `bing.com/ck/a` | Legitimate Bing redirector (abused) |
| Email Hash (SHA256) | Computed from `sample-2075.eml` | Unique sample identifier |

---

## 6. MITRE ATT&CK Mapping

| Tactic | Technique | ID | Application |
|---|---|---|---|
| **Resource Development** | Acquire Infrastructure: Web Services | T1583.006 | Registered free Zendesk account for phishing delivery |
| **Initial Access** | Phishing: Spearphishing Link | T1566.002 | "Reset Password" link leading to credential harvester |
| **Execution** | User Execution: Malicious Link | T1204.001 | Victim clicking the obfuscated redirect chain |
| **Credential Access** | Input Capture: Web Portal Capture | T1056.003 | Fake MetaMask login page harvesting credentials |
| **Defense Evasion** | Impersonation | T1656 | Masquerading as MetaMask Support via Zendesk |
| **Defense Evasion** | Obfuscated Files or Information | T1027 | Base64-encoded final URL inside Bing redirector |

---

## 7. Incident Response Playbook Highlights

As part of this project, a reusable **12-phase SOC Incident Response Playbook** was developed for phishing investigations:

1. **Detection & Alerting** — Ingest email gateway alerts, user reports, and SIEM correlation rules
2. **Triage & Prioritization** — Severity classification using a 4-level matrix (P1–P4)
3. **Header Analysis** — SPF/DKIM/DMARC validation, originating IP lookup, relay path reconstruction
4. **URL & Payload Analysis** — Safe detonation in sandbox, redirect chain decoding, domain reputation check
5. **IOC Extraction** — Domains, IPs, hashes, email addresses, file artifacts
6. **Threat Intelligence Enrichment** — Cross-reference with VirusTotal, AbuseIPDB, urlscan.io, WHOIS
7. **Scope Assessment** — Determine how many users received the same campaign
8. **Containment** — Block sender domain, quarantine related messages, disable compromised accounts
9. **Eradication** — Remove phishing emails from all mailboxes, revoke any leaked credentials
10. **Recovery** — Password resets, MFA re-enrollment, monitoring for follow-up attacks
11. **Documentation** — Formal incident report with timeline, IOC table, and MITRE mapping
12. **Lessons Learned** — Update detection rules, security awareness training, platform abuse mitigations

---

## 8. Key Takeaways & Detection Gaps

### What This Case Teaches

> **SPF/DKIM/DMARC are necessary but not sufficient.** They verify that an email was sent by an authorized server for the sending domain — they do not verify that the sending domain is trustworthy or that the content is legitimate.

### Recommended Detections

1. **Zendesk subdomain monitoring**: Alert on inbound emails from `*.zendesk.com` subdomains not on your organization's allow-list.
2. **Display name vs. domain mismatch**: Flag emails where the display name references a known brand (e.g., "MetaMask") but the sending domain is unrelated.
3. **Redirect chain analysis**: Inspect URLs that pass through known redirector services (Bing, Google AMP, bit.ly) before reaching an unknown domain.
4. **X-Mailer fingerprinting**: Track emails from SaaS mailers (`Zendesk Mailer`, `SendGrid`, `Mailchimp`) that don't correspond to known business relationships.

### Tools Used

Google Messageheader · MXToolbox · CyberChef · urlscan.io · VirusTotal · AbuseIPDB · WHOIS · Linux Terminal · SHA256sum
