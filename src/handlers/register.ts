import type { Env } from "../types";

export const handleRegister = async (request: Request, env: Env) => {
  try {
    const { client_id, client_secret } = await request.json();

    if (!client_id || !client_secret) {
      return Response.json(
        { error: "missing_fields" },
        { status: 400 }
      );
    }

    const sub = client_id; // or generate a UUID if you prefer

    await env.CLIENTS.put(
      client_id,
      JSON.stringify({ client_id, client_secret, sub }),{
      expirationTtl: 60*60*24*30}
    );

    return Response.json({ sub });
  } catch {
    return Response.json(
      { error: "invalid_request" },
      { status: 400 }
    );
  }
};

