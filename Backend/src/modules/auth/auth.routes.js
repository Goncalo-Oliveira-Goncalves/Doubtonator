const express = require("express");
const { ok } = require("../../shared/http/response");

const router = express.Router();

router.get("/session", (req, res) => {
  const isAuthenticated = Boolean(req.session && req.session.userId);
  return ok(res, {
    authenticated: isAuthenticated,
    userId: isAuthenticated ? req.session.userId : null,
  });
});

router.post("/session", (req, res) => {
  const userId = req.body?.userId || "demo-user";
  req.session.userId = userId;
  return ok(res, { authenticated: true, userId }, 201);
});

router.delete("/session", (req, res) => {
  if (!req.session) {
    return ok(res, { authenticated: false });
  }
  req.session.destroy(() => {
    return ok(res, { authenticated: false });
  });
});

module.exports = {
  authRouter: router,
};
