const express = require("express");
const { notImplemented } = require("../../shared/middleware/not-implemented");

const router = express.Router();
router.get("/", notImplemented("users"));

module.exports = {
  usersRouter: router,
};
