const express = require("express");
const { ok, error } = require("../../shared/http/response");
const { safeUserId } = require("../../shared/utils/user-id");

const router = express.Router();

router.get("/session", (req, res) => {
  const isAuthenticated = Boolean(req.session && req.session.userId);
  return ok(res, {
    authenticated: isAuthenticated,
    userId: isAuthenticated ? req.session.userId : null,
  });
});

router.post("/session", (req, res) => {
  const raw = req.body?.userId ?? "user-1";
  const userId = safeUserId(typeof raw === "string" ? raw : String(raw));
  if (!userId) {
    return error(
      res,
      400,
      "INVALID_USER_ID",
      "userId must be 1–80 chars: letters, digits, underscore, hyphen only"
    );
  }
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
