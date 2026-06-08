# SEN2008 Software Security - Term Project: WebShield

**Project Title:** WebShield - Real-Time Phishing & Malware Detection Engine  
  
---

## 1. Project Overview
WebShield is a cybersecurity defense system developed for the SEN2008 Software Security course. 
It actively protects users from zero-day phishing attacks and malicious websites. 
The system consists of a **Node.js/Express Backend** that utilizes heuristic algorithms alongside Google Safe Browsing and VirusTotal APIs, 
and a **Chrome Extension Frontend** that provides real-time risk analysis to the user.

## 2. Prerequisites
Before evaluating the project, please ensure the following software is installed on your system:
* **Node.js** (v16.0 or higher) - For running the backend server.
* **Google Chrome** - For installing the frontend extension.
* **Git** - For cloning the repository.

---

## 3. Step-by-Step Installation Guide (Evaluation Setup)

To test the project locally, both the backend server and the Chrome extension must be initialized.

### Phase 1: Backend (Node.js Server) Setup
1. **Clone the repository** to your local machine:
   ```bash
   git clone [https://github.com/cihanozdemr/WebShield.git](https://github.com/cihanozdemr/WebShield.git)
   cd WebShield
