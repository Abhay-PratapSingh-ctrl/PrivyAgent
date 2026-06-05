# 🧪 Development Friction & Engineering Learnings

Building PrivyAgent required navigating SDK limitations, infrastructure challenges, and deployment blockers.

Rather than treating these as failures, we used them to improve system resilience.

---

# 1. Terminal 3 SDK Connectivity

### Issue

Encountered:

```text
PERMISSION_DENIED
```

when accessing:

```text
https://api.terminal3.io/v1
```

### Impact

TEE-backed execution could not be fully validated during early development.

### Resolution

Implemented a local simulation layer that mirrors expected enclave responses.

### Outcome

Development continued without blocking UI and workflow testing.

---

# 2. Node/NPM Permission Conflicts

### Issue

Global Vercel CLI installations produced:

```text
EACCES
```

permission errors.

### Resolution

Migrated to:

```bash
npx vercel --prod
```

for ephemeral execution.

### Outcome

Deployment became environment-independent and reproducible.

---

# 3. Turbopack Compatibility

### Issue

Intermittent crashes occurred when importing TEE SDK modules through Turbopack.

### Resolution

Adjusted module resolution strategy and prioritized CommonJS compatibility.

### Outcome

Stable production builds.

---

# 4. Deployment Restrictions

### Issue

Repository restrictions prevented standard GitHub-integrated CI/CD workflows.

### Resolution

Implemented direct CLI deployment through Vercel.

### Outcome

Production deployments remained uninterrupted.

---

# 5. AI Rate Limiting

### Issue

Gemini-only architecture experienced interruptions during quota exhaustion.

### Resolution

Designed the PrivyAgent Resilience Cascade:

```text
Gemini
   ↓
Groq
   ↓
Local Fallback
```

### Outcome

Near-continuous operation despite provider outages or quota limits.

---

# Key Takeaway

One of the most important lessons from building PrivyAgent was that secure systems must also be resilient systems.

Every obstacle encountered during development directly influenced the final architecture.

The resulting platform is stronger because of those constraints.
