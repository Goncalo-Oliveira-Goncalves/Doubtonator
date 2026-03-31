const { app } = require("./app");
const { loadEnv } = require("./config/env");

const env = loadEnv();
const server = app.listen(env.port, () => {
  console.log(`Backend listening on port ${env.port}`);
});

function shutdown(signal) {
  console.log(`Received ${signal}, shutting down gracefully...`);
  server.close(() => {
    process.exit(0);
  });
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
