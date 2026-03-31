function requestId(req, res, next) {
  const id = `req_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  res.locals.requestId = id;
  res.setHeader("x-request-id", id);
  next();
}

module.exports = {
  requestId,
};
