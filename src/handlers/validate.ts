import type { Env } from "../types";
import { verify } from "hono/jwt";

export const handleValidate = async (request: Request, env: Env) => {
  try {

    const { token } = await request.json();
    console.log("JWT_SECRET:", env.JWT_SECRET)
    console.log(token)
    if (!token) {
      return Response.json(
        { valid: false, error: "missing_token" },
        { status: 400 }
      );
    }

    const payload = await verify(token, env.JWT_SECRET, {
      alg: "HS256"
    });


    return Response.json({ valid: true, payload });
  } catch(e) {
    return Response.json({ valid: false, error: String(e) })

  }
};

