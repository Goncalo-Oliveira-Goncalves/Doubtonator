const required = ["NODE_ENV", "PORT", "SESSION_SECRET"];

function loadEnv() {
  const missing = required.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(`Missing required env vars: ${missing.join(", ")}`);
  }

  return {
    nodeEnv: process.env.NODE_ENV,
    port: Number(process.env.PORT),
    sessionSecret: process.env.SESSION_SECRET,
    corsOrigin: process.env.CORS_ORIGIN || "http://localhost:3000",
  };
}

module.exports = {
  loadEnv,
};
