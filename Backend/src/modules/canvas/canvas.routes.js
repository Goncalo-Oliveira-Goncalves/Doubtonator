const express = require("express");
const { ok } = require("../../shared/http/response");

const router = express.Router();

const graph = {
  nodes: [
    { id: "scrapper", label: "Trend-Scrapper AI", x: 120, y: 250, color: "#3c91e6", sub: "AI node", route: "agent-node-popup.html" },
    { id: "trends", label: "Trends DB", x: 290, y: 250, color: "#9fd356", sub: "Database node", route: "database-node-popup.html" },
    { id: "groupCalls", label: "Group Calls DB", x: 120, y: 390, color: "#ff9600", sub: "Database node", route: "database-node-popup.html" },
    { id: "icpEnricher", label: "ICP Enricher", x: 300, y: 390, color: "#3c91e6", sub: "AI node", route: "agent-node-popup.html" },
    { id: "scripter", label: "Scripting AI", x: 490, y: 320, color: "#3c91e6", sub: "AI node", route: "agent-node-popup.html" },
    { id: "scripts", label: "Videos DB", x: 690, y: 320, color: "#9fd356", sub: "Database node", route: "database-node-popup.html" },
    { id: "filmed", label: "Filmed (Human)", x: 690, y: 175, color: "#b06cff", sub: "Human node", route: "agent-node-popup.html" },
    { id: "zernio", label: "Zernio API", x: 865, y: 320, color: "#ff9600", sub: "API node", route: "agent-node-popup.html" },
    { id: "instagram", label: "Instagram", x: 1010, y: 215, color: "#9fd356", sub: "Channel node", route: "agent-node-popup.html" },
    { id: "threads", label: "Threads", x: 1010, y: 320, color: "#9fd356", sub: "Channel node", route: "agent-node-popup.html" },
    { id: "linkedin", label: "LinkedIn", x: 1010, y: 425, color: "#9fd356", sub: "Channel node", route: "agent-node-popup.html" },
    { id: "igFetcher", label: "IG Page Fetcher", x: 1160, y: 320, color: "#3c91e6", sub: "Fetcher node", route: "agent-node-popup.html" },
    { id: "otherData", label: "Other Data", x: 1160, y: 210, color: "#ff9600", sub: "Data node", route: "database-node-popup.html" },
    { id: "videoData", label: "Video Data DB", x: 1160, y: 430, color: "#9fd356", sub: "Database node", route: "database-node-popup.html" },
    { id: "igScore", label: "Instagram Scorecard", x: 960, y: 160, color: "#3c91e6", sub: "Analytics node", route: "agent-node-popup.html" },
    { id: "autoFeedback", label: "Auto-Feedback System", x: 960, y: 500, color: "#3c91e6", sub: "AI feedback", route: "agent-node-popup.html" },
  ],
  edges: [
    { id: "e0", from: "scrapper", to: "trends", speed: 1.1 },
    { id: "e1", from: "groupCalls", to: "icpEnricher", speed: 1.0 },
    { id: "e2", from: "icpEnricher", to: "scripter", speed: 1.2 },
    { id: "e3", from: "trends", to: "scripter", speed: 1.1 },
    { id: "e4", from: "scripter", to: "scripts", speed: 1.3 },
    { id: "e5", from: "scripts", to: "filmed", speed: 0.9 },
    { id: "e6", from: "filmed", to: "scripts", speed: 0.9 },
    { id: "e7", from: "scripts", to: "zernio", speed: 1.1 },
    { id: "e8", from: "zernio", to: "instagram", speed: 1.05 },
    { id: "e9", from: "zernio", to: "threads", speed: 1.0 },
    { id: "e10", from: "zernio", to: "linkedin", speed: 1.0 },
    { id: "e11", from: "instagram", to: "igFetcher", speed: 1.2 },
    { id: "e12", from: "threads", to: "igFetcher", speed: 1.15 },
    { id: "e13", from: "linkedin", to: "igFetcher", speed: 1.1 },
    { id: "e14", from: "igFetcher", to: "otherData", speed: 0.95 },
    { id: "e15", from: "igFetcher", to: "videoData", speed: 1.15 },
    { id: "e16", from: "otherData", to: "igScore", speed: 0.95 },
    { id: "e17", from: "videoData", to: "autoFeedback", speed: 1.2 },
    { id: "e18", from: "autoFeedback", to: "scripts", speed: 1.25 },
  ],
};

router.get("/", (req, res) => {
  return ok(res, {
    message: "Canvas routes online",
    endpoints: ["/api/v1/canvas/graph"],
  });
});

router.get("/graph", (req, res) => {
  return ok(res, graph);
});

module.exports = {
  canvasRouter: router,
};
