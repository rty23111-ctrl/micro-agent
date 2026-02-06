// test-suite.js

const BASE = "http://localhost:8787";

async function assert(condition, message) {
  if (!condition) {
    console.error("❌ TEST FAILED:", message);
    process.exit(1);
  }
}

async function call(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, options);
  const json = await res.json().catch(() => ({}));
  return { status: res.status, json };
}

async function run() {
  console.log("🔍 Running full API test suite...\n");

  // 1. HEALTH
  console.log("➡️  Testing /health");
  const health = await call("/health");
  assert(health.status === 200, "Health endpoint did not return 200");
  assert(health.json.status === "ok", "Health endpoint did not return {status:'ok'}");
  console.log("   ✔️  /health OK\n");

  // 2. CAPABILITIES
  console.log("➡️  Testing /capabilities");
  const caps = await call("/capabilities");
  assert(caps.status === 200, "Capabilities endpoint did not return 200");
  assert(typeof caps.json === "object", "Capabilities did not return JSON");
  console.log("   ✔️  /capabilities OK\n");

  // 3. REGISTER
  console.log("➡️  Testing /api/register");
  const register = await call("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: "demo",
      client_secret: "demo-secret"
    })
  });

  assert(register.status === 200, "Register did not return 200");
  assert(typeof register.json.sub === "string", "Register did not return sub");
  console.log("   ✔️  /api/register OK");

  const sub = register.json.sub;
  console.log("   ℹ️  Using sub =", sub, "\n");

  // 4. TOKEN
  console.log("➡️  Testing /api/token");
  const tokenRes = await call("/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: "demo",
      client_secret: "demo-secret",
      sub
    })
  });

  assert(tokenRes.status === 200, "Token endpoint did not return 200");
  assert(typeof tokenRes.json.token === "string", "Token endpoint did not return token");
  console.log("   ✔️  /api/token OK");

  const token = tokenRes.json.token;
  console.log("   ℹ️  Received token:", token.substring(0, 20) + "...", "\n");

  // 5. VALIDATE
  console.log("➡️  Testing /api/validate");
  console.log("TOKEN SENT TO VALIDATE:", token);

  const validate = await call("/api/validate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token })
  });
  console.log("VALIDATE RAW RESPONSE:", validate);


  assert(validate.status === 200, "Validate did not return 200");
  assert(validate.json.valid === true, "Validate did not return valid:true");
  assert(validate.json.payload.sub === sub, "Validate payload.sub does not match");
  console.log("   ✔️  /api/validate OK\n");

  console.log("🎉 ALL TESTS PASSED — your auth service is working end-to-end.\n");
}

run();

