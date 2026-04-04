require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const session = require("express-session");

const { loadEnv } = require("./config/env");
const { ok } = require("./shared/http/response");
const { requestId } = require("./shared/middleware/request-id");
const { errorHandler, notFoundHandler } = require("./shared/middleware/error-handler");
const { devAutoSession } = require("./shared/middleware/dev-auto-session");
const { apiV1Router } = require("./routes/api-v1");

const env = loadEnv();
const app = express();

app.set("trust proxy", 1);
app.use(requestId);
app.use(morgan("tiny"));
const allowedOrigins = new Set([
  env.corsOrigin,
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:5500",
  "http://127.0.0.1:5500",
]);

app.use(
  cors({
    origin(origin, callback) {
      // Allow server-to-server or direct file preview requests.
      if (!origin) {
        callback(null, true);
        return;
      }
      callback(null, allowedOrigins.has(origin));
    },
    credentials: true,
  })
);
app.use(helmet());
app.use(express.json({ limit: "1mb" }));
app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 120,
    standardHeaders: true,
    legacyHeaders: false,
  })
);
app.use(
  session({
    secret: env.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: env.nodeEnv === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);
app.use(devAutoSession(env));

app.get("/health", (req, res) => {
  return ok(res, { status: "ok" });
});

app.get("/ready", (req, res) => {
  return ok(res, {
    status: "ok",
    checks: {
      database: "not-wired",
      sessionStore: "memory-store-dev-only",
    },
  });
});

app.get("/", (req, res) => {
  return ok(res, {
    service: "doubtonator-backend",
    status: "ok",
    docs: {
      health: "/health",
      readiness: "/ready",
      apiBase: "/api/v1",
      session: "/api/v1/auth/session",
      canvasGraph: "/api/v1/canvas/graph",
      canvasMermaid: "/api/v1/canvas/mermaid",
    },
  });
});

app.get("/api", (req, res) => {
  return ok(res, {
    version: "v1",
    basePath: "/api/v1",
    endpoints: [
      "/api/v1/auth/session",
      "/api/v1/canvas/graph",
      "/api/v1/canvas/mermaid",
      "/api/v1/users",
      "/api/v1/quests",
      "/api/v1/clan",
      "/api/v1/events",
      "/api/v1/rewards",
    ],
  });
});

app.use("/api/v1", apiV1Router);
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = {
  app,
};
