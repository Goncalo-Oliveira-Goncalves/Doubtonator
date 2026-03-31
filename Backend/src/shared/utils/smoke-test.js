const endpoints = ["/health", "/ready", "/api/v1/auth/session"];

console.log("Smoke test placeholder. Run backend first, then test:");
for (const endpoint of endpoints) {
  console.log(`- GET http://localhost:3001${endpoint}`);
}
