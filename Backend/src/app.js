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
const { apiV1Router } = require("./routes/api-v1");

const env = loadEnv();
const app = express();

app.set("trust proxy", 1);
app.use(requestId);
app.use(morgan("tiny"));
app.use(
  cors({
    origin: env.corsOrigin,
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

app.use("/api/v1", apiV1Router);
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = {
  app,
};
