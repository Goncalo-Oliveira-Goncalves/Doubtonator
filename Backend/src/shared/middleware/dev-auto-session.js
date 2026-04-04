const { safeUserId } = require("../utils/user-id");

/**
 * In development, assigns a default session user when none is set so local UI
 * can call authenticated routes without a manual login step.
 */
function devAutoSession({ nodeEnv, devAutoUserId }) {
  const autoId = safeUserId(devAutoUserId || "");
  return (req, res, next) => {
    if (nodeEnv !== "development" || !autoId) {
      next();
      return;
    }
    if (req.session && !req.session.userId) {
      req.session.userId = autoId;
    }
    next();
  };
}

module.exports = {
  devAutoSession,
};
