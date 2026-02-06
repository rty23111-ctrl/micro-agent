export const handleCapabilities = () => {
  return Response.json({
    name: "minimal-auth-service",
    version: "0.2.0",
    endpoints: [
      { path: "/health", method: "GET" },
      { path: "/capabilities", method: "GET" },
      { path: "/api/register", method: "POST" },
      { path: "/api/token", method: "POST" },
      { path: "/api/validate", method: "POST" }
    ]
  });
};

