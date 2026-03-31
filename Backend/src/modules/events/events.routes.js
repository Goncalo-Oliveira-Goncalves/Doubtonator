const express = require("express");
const { notImplemented } = require("../../shared/middleware/not-implemented");

const router = express.Router();
router.get("/", notImplemented("events"));

module.exports = {
  eventsRouter: router,
};
