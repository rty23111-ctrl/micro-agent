import type { Env } from "./types";
import { handleHealth } from "./handlers/health";
import { handleCapabilities } from "./handlers/capabilities";
import { handleRegister } from "./handlers/register";
import { handleToken } from "./handlers/token";
import { handleValidate } from "./handlers/validate";

const DASHBOARD_HTML = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Auth Dashboard</title>
    <style>
      body { font-family: sans-serif; margin: 2rem; }
      h1 { margin-bottom: 0.5rem; }
      .section { margin-top: 2rem; }
      pre { background: #eee; padding: 1rem; border-radius: 6px; }
      input { padding: 6px; width: 300px; }
      button { padding: 6px 12px; margin-left: 6px; }
      a { display: inline-block; margin-top: 1rem; }
    </style>
  </head>
  <body>
    <h1>Authentication Service Dashboard</h1>
    <p>Agent-first, minimal, deterministic.</p>

    <div class="section">
      <h2>Health</h2>
      <form method="post" action="/dashboard/health">
        <button>Check Health</button>
      </form>
    </div>

    <div class="section">
      <h2>Issue Token</h2>
      <form method="post" action="/dashboard/token">
        <button>Generate Token</button>
      </form>
    </div>

    <div class="section">
      <h2>Validate Token</h2>
      <form method="post" action="/dashboard/validate">
        <input name="token" placeholder="Paste token here" />
        <button>Validate</button>
      </form>
    </div>
  </body>
</html>`;

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const { pathname } = url;

    // Dashboard page
    if (request.method === "GET" && pathname === "/dashboard") {
      return new Response(DASHBOARD_HTML, {
        headers: { "Content-Type": "text/html; charset=utf-8" }
      });
    }

    // Dashboard actions
    if (request.method === "POST" && pathname === "/dashboard/health") {
      return handleHealth();
    }

    if (request.method === "POST" && pathname === "/dashboard/token") {
      return handleToken(
        new Request("http://local/api/token", { method: "POST" }),
        env
      );
    }

    if (request.method === "POST" && pathname === "/dashboard/validate") {
      const form = await request.formData();
      const token = form.get("token");

      return handleValidate(
        new Request("http://local/api/validate", {
          method: "POST",
          body: JSON.stringify({ token }),
          headers: { "Content-Type": "application/json" }
        }),
        env
      );
    }

    // Existing API
    if (request.method === "GET" && pathname === "/health") {
      return handleHealth();
    }

    if (request.method === "GET" && pathname === "/capabilities") {
      return handleCapabilities();
    }

    if (request.method === "POST" && pathname === "/api/register") {
      return handleRegister(request, env);
    }

    if (request.method === "POST" && pathname === "/api/token") {
      return handleToken(request, env);
    }

    if (request.method === "POST" && pathname === "/api/validate") {
      return handleValidate(request, env);
    }

    return new Response("Not found", { status: 404 });
  }
};
