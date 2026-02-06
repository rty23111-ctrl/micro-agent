// src/handlers/health.ts

export const handleHealth = () => {
  return Response.json({ status: "ok" });
};
