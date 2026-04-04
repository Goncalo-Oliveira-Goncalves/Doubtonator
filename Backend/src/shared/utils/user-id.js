/**
 * @param {unknown} raw
 * @returns {string | null}
 */
function safeUserId(raw) {
  if (typeof raw !== "string" || !raw.length) return null;
  if (!/^[a-zA-Z0-9_-]{1,80}$/.test(raw)) return null;
  return raw;
}

module.exports = {
  safeUserId,
};
