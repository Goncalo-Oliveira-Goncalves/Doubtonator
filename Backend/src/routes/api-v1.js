const express = require("express");
const { authRouter } = require("../modules/auth/auth.routes");
const { usersRouter } = require("../modules/users/users.routes");
const { questsRouter } = require("../modules/quests/quests.routes");
const { canvasRouter } = require("../modules/canvas/canvas.routes");
const { clanRouter } = require("../modules/clan/clan.routes");
const { eventsRouter } = require("../modules/events/events.routes");
const { rewardsRouter } = require("../modules/rewards/rewards.routes");
const { error } = require("../shared/http/response");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/users", usersRouter);
router.use("/quests", questsRouter);
router.use("/canvas", canvasRouter);
router.use("/clan", clanRouter);
router.use("/events", eventsRouter);
router.use("/rewards", rewardsRouter);

router.use((req, res) => {
  return error(res, 404, "API_ROUTE_NOT_FOUND", "API route not found");
});

module.exports = {
  apiV1Router: router,
};
