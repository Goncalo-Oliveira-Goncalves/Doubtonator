const express = require("express");
const { ok, error } = require("../../shared/http/response");
const { safeUserId } = require("../../shared/utils/user-id");
const {
  readUserMermaidSource,
  writeUserMermaidSource,
  loadGraphForUser,
} = require("./user-canvas-store");
const { buildGraphFromMermaid } = require("./mermaid-graph");

const router = express.Router();

function sessionUserId(req) {
  return safeUserId(req.session?.userId);
}

function requireUser(req, res, next) {
  const id = sessionUserId(req);
  if (!id) {
    return error(
      res,
      401,
      "UNAUTHORIZED",
      'Set a session user: POST /api/v1/auth/session with { "userId": "your-id" } (letters, numbers, _ and - only). In development, set DEV_AUTO_USER_ID in .env to skip that.'
    );
  }
  req.doubtonatorUserId = id;
  next();
}

router.get("/", (req, res) => {
  return ok(res, {
    message: "Canvas routes online",
    endpoints: ["/api/v1/canvas/graph", "/api/v1/canvas/mermaid"],
    storage:
      "Per-user file backend/data/user-canvas/<userId>/workflow.mermaid (matches Canvases DB in your backend design doc)",
  });
});

router.get("/graph", requireUser, (req, res) => {
  const userId = req.doubtonatorUserId;
  try {
    const { graph } = loadGraphForUser(userId);
    return ok(res, graph);
  } catch (err) {
    return error(res, 422, "CANVAS_PARSE_ERROR", String(err.message || err));
  }
});

router.get("/mermaid", requireUser, (req, res) => {
  try {
    const source = readUserMermaidSource(req.doubtonatorUserId);
    return ok(res, { userId: req.doubtonatorUserId, source });
  } catch (err) {
    return error(res, 500, "CANVAS_READ_ERROR", String(err.message || err));
  }
});

router.put("/mermaid", requireUser, (req, res) => {
  const source = req.body?.source;
  if (typeof source !== "string") {
    return error(res, 400, "INVALID_BODY", 'JSON body must include string "source"');
  }
  if (source.trim().length < 3) {
    return error(res, 400, "INVALID_SOURCE", "Mermaid source is too short");
  }
  try {
    buildGraphFromMermaid(source);
  } catch (err) {
    return error(res, 422, "CANVAS_PARSE_ERROR", String(err.message || err));
  }
  try {
    writeUserMermaidSource(req.doubtonatorUserId, source);
    const { graph } = loadGraphForUser(req.doubtonatorUserId);
    return ok(res, {
      userId: req.doubtonatorUserId,
      saved: true,
      nodeCount: graph.nodes.length,
      edgeCount: graph.edges.length,
    });
  } catch (err) {
    return error(res, 500, "CANVAS_WRITE_ERROR", String(err.message || err));
  }
});

module.exports = {
  canvasRouter: router,
};
