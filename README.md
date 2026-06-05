# 🛡️ PrivyAgent

<div align="center">

### **Your AI that acts, never sees.**

*Privacy-preserving autonomous agents powered by Trusted Execution Environments.*

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Open-success?style=for-the-badge)](https://privy-agent.vercel.app)
[![Terminal 3](https://img.shields.io/badge/Terminal_3-TEE_Powered-blue?style=for-the-badge)]()
[![Status](https://img.shields.io/badge/Status-Production_Ready-success?style=for-the-badge)]()

---

### 🔒 Reason. Verify. Execute.

**PrivyAgent** enables AI agents to perform real-world actions without exposing user secrets to the AI itself.

Built for the **Terminal 3 Agent Dev Kit Bounty**.

</div>

---

# ⚠️ The Problem

Today's AI agents have a dangerous security model:

* Give the AI your credentials
* Hope it behaves correctly
* Trust that nothing goes wrong

If the model is compromised, prompt-injected, or manipulated:

❌ Credentials can leak
❌ Financial actions can be abused
❌ Users lose control

---

# 💡 Our Solution

PrivyAgent separates:

🧠 **Thinking** from **Authority**

The AI understands *what* the user wants.

The Trusted Execution Environment decides *whether it is allowed*.

This means:

* The AI never sees secrets
* Policies remain enforceable
* Every action becomes verifiable

---

# 🏗 Architecture

```text
User Intent
     │
     ▼
┌─────────────────────┐
│  Reasoning Layer    │
│ Gemini → Groq       │
│ → Local Fallback    │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│     TEE Vault       │
│ Policy Validation   │
│ Remote Attestation  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│    Audit Layer      │
│ Signed Proofs       │
│ Verifiable Logs     │
└─────────────────────┘
```

---

# ✨ Key Features

### 🔐 TEE-Secured Execution

Sensitive credentials remain inside a secure enclave.

---

### 🧠 Multi-AI Resilience Cascade

Primary → Fallback → Survival Mode

```text
Gemini
   ↓
Groq
   ↓
Local Logic
```

Even if providers fail, the agent continues operating.

---

### 🛡 Prompt-Injection Defense

Intent classification and policy enforcement prevent unauthorized actions from reaching the execution layer.

---

### 📜 Cryptographic Audit Trail

Every action generates:

* Proof ID
* Signed execution record
* Verifiable audit log

No ghost transactions.

No hidden actions.

---

# 🛠 Tech Stack

### Frontend

* Next.js 16
* React
* TypeScript
* Tailwind CSS

### AI Layer

* Gemini 3.5 Flash
* Groq Llama 3

### Security Layer

* Terminal 3 TEE SDK
* Remote Attestation

### Infrastructure

* Vercel

---

# 🚀 Live Deployment

### Production

https://privy-agent.vercel.app

---

# 📚 Documentation

* `ARCHITECTURE.md`
* `bugs.md`

---

# 🎯 Hackathon Statement

PrivyAgent demonstrates a future where autonomous agents can execute powerful actions without requiring blind trust.

By combining AI reasoning, Trusted Execution Environments, and cryptographic verification, we create agents that are:

✅ Secure

✅ Auditable

✅ Privacy-Preserving

✅ Resilient

---

<div align="center">

### "Your AI that acts, never sees."

</div>
