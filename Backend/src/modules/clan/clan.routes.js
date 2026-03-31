const express = require("express");
const { notImplemented } = require("../../shared/middleware/not-implemented");

const router = express.Router();
router.get("/", notImplemented("clan"));

module.exports = {
  clanRouter: router,
};
