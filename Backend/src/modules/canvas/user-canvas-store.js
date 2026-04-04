const path = require("path");
const fs = require("fs");
const { buildGraphFromMermaid, defaultGraph } = require("./mermaid-graph");

const graphCache = new Map();

function repoRoot() {
  return path.join(__dirname, "..", "..", "..", "..");
}

function userCanvasRoot() {
  const fromEnv = process.env.USER_CANVAS_DATA_DIR;
  if (fromEnv) {
    return path.isAbsolute(fromEnv) ? fromEnv : path.join(process.cwd(), fromEnv);
  }
  return path.join(repoRoot(), "backend", "data", "user-canvas");
}

function resolveTemplateMermaidPath() {
  const fromEnv = process.env.CANVAS_MERMAID_PATH;
  if (fromEnv) {
    return path.isAbsolute(fromEnv) ? fromEnv : path.join(process.cwd(), fromEnv);
  }
  return path.join(repoRoot(), "AI Workflow", "workflow-map.mermaid");
}

/**
 * @param {string} userId
 */
function userMermaidPath(userId) {
  return path.join(userCanvasRoot(), userId, "workflow.mermaid");
}

/**
 * @param {string} userId
 */
function ensureDirForUser(userId) {
  const dir = path.dirname(userMermaidPath(userId));
  fs.mkdirSync(dir, { recursive: true });
}

/**
 * Seeds per-user workflow from the repo template (or CANVAS_MERMAID_PATH) once.
 * @param {string} userId
 */
function ensureUserMermaidFile(userId) {
  const dest = userMermaidPath(userId);
  if (fs.existsSync(dest)) return;
  ensureDirForUser(userId);
  const template = resolveTemplateMermaidPath();
  try {
    fs.copyFileSync(template, dest);
  } catch {
    const fallback = defaultGraph();
    if (fallback) {
      fs.writeFileSync(dest, minimalMermaidFromFallback(), "utf8");
      return;
    }
    fs.writeFileSync(dest, "flowchart LR\n    a[\"Start\"] --> b[\"End\"]\n", "utf8");
  }
}

function minimalMermaidFromFallback() {
  return [
    "---",
    "config:",
    "  look: handDrawn",
    "  layout: dagre",
    "---",
    "flowchart LR",
    '    startNode["Canvas"] --> endNode["Edit via PUT /api/v1/canvas/mermaid"]',
    "",
  ].join("\n");
}

/**
 * @param {string} userId
 */
function readUserMermaidSource(userId) {
  ensureUserMermaidFile(userId);
  return fs.readFileSync(userMermaidPath(userId), "utf8");
}

/**
 * @param {string} userId
 * @param {string} source
 */
function writeUserMermaidSource(userId, source) {
  ensureDirForUser(userId);
  fs.writeFileSync(userMermaidPath(userId), source, "utf8");
  graphCache.delete(userId);
}

/**
 * @param {string} userId
 */
function loadGraphForUser(userId) {
  ensureUserMermaidFile(userId);
  const filePath = userMermaidPath(userId);
  const stat = fs.statSync(filePath);
  const cached = graphCache.get(userId);
  if (cached && cached.mtimeMs === stat.mtimeMs) {
    return { graph: cached.graph, mtimeMs: stat.mtimeMs, filePath };
  }
  const text = fs.readFileSync(filePath, "utf8");
  const graph = buildGraphFromMermaid(text);
  graphCache.set(userId, { mtimeMs: stat.mtimeMs, graph });
  return { graph, mtimeMs: stat.mtimeMs, filePath };
}

module.exports = {
  readUserMermaidSource,
  writeUserMermaidSource,
  loadGraphForUser,
  userMermaidPath,
  userCanvasRoot,
};
