# micro-agent

Auth Service — Minimal, Agent‑First Authentication for AI Workflows

A lightweight, deterministic authentication service designed for AI agents and micro‑services.
Built on Cloudflare Workers, with a focus on clarity, simplicity, and zero‑friction integration.

This project provides:

• 🔐 Token issuance
• 🧪 Token validation
• 🧾 Client registration
• 📡 Health and capabilities endpoints
• 🖥️ A simple HTML dashboard for manual testing
• ⚙️ Stateless, agent‑friendly design
• 🪶 Zero dependencies beyond Cloudflare’s runtime


---

Features

✔ Token Issuance

POST /api/token
Issues a signed token using your Worker’s keypair.

✔ Token Validation

POST /api/validate
Validates a token and returns its status.

✔ Client Registration

POST /api/register
Registers a new client and returns a client ID.

✔ Health Check

GET /health
Returns a simple OK response for monitoring.

✔ Capabilities

GET /capabilities
Returns metadata about the service, including version and supported endpoints.

✔ HTML Dashboard

GET /dashboard
A minimal UI for manual testing of token issuance and validation.

---

Project Structure

src/
  index.ts            # Main Worker entrypoint
  dashboard.html      # Inline dashboard UI
  handlers/
    health.ts
    token.ts
    validate.ts
    register.ts
    capabilities.ts
test/
  ...                 # Test harness and integration tests
VERSION               # Current service version
wrangler.toml         # Cloudflare Worker configuration


---

Endpoints

Method	Path	Description	
GET	/dashboard	HTML dashboard UI	
POST	/dashboard/*	Dashboard form actions	
GET	/health	Health check	
GET	/capabilities	Service metadata	
POST	/api/register	Register a new client	
POST	/api/token	Issue a token	
POST	/api/validate	Validate a token	


---

Development

Start the Worker locally:

npx wrangler dev


Open the forwarded port in Codespaces, then visit:

/dashboard


---

Versioning

The current version is stored in the VERSION file.
You can tag releases using:

git tag v0.1.0
git push --tags


---

Design Philosophy

This project follows a few core principles:

• Minimal surface area — only the endpoints required for agent workflows
• Deterministic behaviour — no hidden state, no surprises
• Stateless by default — tokens encode everything needed
• Agent‑first — predictable responses, stable contracts
• Portable — runs anywhere Cloudflare Workers run


---

Roadmap

• 🔄 Token expiry + auto‑renewal
• 🧩 Client lifecycle management
• 🔑 Key rotation
• 📘 API documentation page
• 🧭 Optional Hono/Hobo UI
• 🧪 Expanded test harness


---

If you want, I can also generate:

• a CHANGELOG.md
• a CONTRIBUTING.md
• a LICENSE
• or a GitHub Release template


