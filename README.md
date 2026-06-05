<div align="center">

# 🛡️ PrivyAgent

**"Your AI that acts, never sees."**  
*A decentralized governance framework for AI agents, secured by Terminal 3 TEE.*

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-privy--agent.vercel.app-brightgreen)](https://privy-agent.vercel.app)
[![System](https://img.shields.io/badge/System-Operational-success)]()

---

</div>

## 🚀 Overview
PrivyAgent is a privacy-first AI agent architecture designed to execute high-stakes tasks—such as travel bookings and financial transactions—without ever exposing sensitive credentials to the base AI layer. 

Built for the **Terminal 3 Agent Dev Kit Bounty**, this project demonstrates how to bridge the gap between powerful LLMs and user-owned data using **Trusted Execution Environments (TEEs)**.

## 🔑 Key Features
- **TEE-Secured Execution:** Sensitive data is handled within an isolated hardware enclave. The AI generates the intent, but the TEE verifies and executes the transaction.
- **Resilient Multi-AI Cascade:** 
  - 🧠 **Primary:** Google Gemini 3.5-Flash
  - ⚡ **Fallback:** Groq Llama-3.3-70b
  - 🛡️ **Safety:** Hardened local logic for zero-downtime execution.
- **Jailbreak Defense:** Real-time intent classification that intercepts and halts prompt-injection attempts before they hit the vault.
- **Cryptographic Audit Trail:** Every agent action is anchored with a unique `Proof ID`, ensuring 100% transparency and auditability.

## 🛠️ Tech Stack
- **Framework:** Next.js 16 (Turbopack)
- **AI Inference:** Gemini API / Groq Cloud
- **Security:** Terminal 3 TEE SDK
- **Deployment:** Vercel

---
*For a deeper technical breakdown, check out our [ARCHITECTURE.md](ARCHITECTURE.md).*