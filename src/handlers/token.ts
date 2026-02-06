import type { Env } from "../types";
import { sign } from "hono/jwt";

export const handleToken = async (request: Request, env: Env) => {
  try {
    const { client_id, client_secret, sub } = await request.json();
    console.log("JWT_SECRET:", env.JWT_SECRET)

    if (!client_id || !client_secret || !sub) {
      return Response.json(
        { error: "missing_fields" },
        { status: 400 }
      );
    }

    const storedRaw = await env.CLIENTS.get(client_id, { type: "json" });
    const stored = storedRaw as
      | { client_id: string; client_secret: string; sub: string }
      | null;

    if (!stored || stored.client_secret !== client_secret || stored.sub !== sub) {
      return Response.json(
        { error: "client_expired" },
        { status: 401 }
      );
    }

    const payload = {
      sub,
      client_id,
      iat: Math.floor(Date.now() / 1000)
    };
    
    await env.CLIENTS.put(client_id,JSON.stringify({client_id,client_secret,sub}),{expirationTtl: 60 * 60 * 24 * 30});

    const token = await sign(payload, env.JWT_SECRET);

    return Response.json({ token });
  } catch (e) {
    return Response.json(
      { error: e ,
      status: 400 }
    );
  }
};

