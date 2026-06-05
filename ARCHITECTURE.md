# PrivyAgent System Architecture

## 1. Problem Statement
**The Challenge:** Current AI agents operate with "all-or-nothing" access. They typically require full, unmasked access to user credentials (API keys, passwords, personal addresses) to perform tasks. This creates a massive attack surface: if the AI is prompt-injected or compromised, the attacker gains full control over the user's digital identity and financial assets.

**The Solution:** PrivyAgent implements a **Hardened Separation of Concerns**. We decouple the **Reasoning Engine** (LLM) from the **Execution Enclave** (TEE). The LLM processes natural language intents, while the TEE holds the "Vault" authority, ensuring that sensitive data is never accessible to the LLM's reasoning layer.

## 2. System Architecture
Our architecture follows a **Three-Layer Security Model**:

### Layer 1: Intelligent Reasoning (Agent Layer)
* **Purpose:** Intent extraction & classification.
* **Tech:** A multi-AI cascade routing system (Gemini → Groq → Local).
* **Mechanism:** Converts natural language (e.g., "Order me a sandwich") into a structured, sanitized JSON intent. It is strictly limited to metadata; it never touches raw credentials.

### Layer 2: Attestation & Orchestration (TEE Vault)
* **Purpose:** Verifiable execution & trust.
* **Tech:** Terminal 3 TEE (Trusted Execution Environment).
* **Mechanism:** The vault performs **Remote Attestation**. It verifies that the incoming intent is within the user's defined "Passport Policy" (e.g., spend caps, approved scopes).

### Layer 3: Immutable Audit Trail
* **Purpose:** Verifiability & compliance.
* **Mechanism:** Every transaction generates a cryptographically signed log entry. This creates a verifiable history of what the agent was authorized to do, preventing "ghost" transactions.

## 3. Resilience Cascade Logic
To ensure 99.9% uptime, we implemented a **Fail-Fast Routing System**:
1. **Primary:** Google Gemini API (High-performance reasoning).
2. **Failover:** Groq Cloud Llama-3 (Instant high-speed inference).
3. **Last-Resort:** Hardcoded Local Safety Logic (Guarantees execution even if both remote APIs are unavailable).