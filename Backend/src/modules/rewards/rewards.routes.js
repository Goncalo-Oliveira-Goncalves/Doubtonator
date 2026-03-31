const express = require("express");
const { notImplemented } = require("../../shared/middleware/not-implemented");

const router = express.Router();
router.get("/", notImplemented("rewards"));

module.exports = {
  rewardsRouter: router,
};
