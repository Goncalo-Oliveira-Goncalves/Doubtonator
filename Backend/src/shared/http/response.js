function ok(res, data, status = 200) {
  return res.status(status).json({
    data,
    meta: {
      requestId: res.locals.requestId || null,
      timestamp: new Date().toISOString(),
    },
  });
}

function error(res, status, code, message, details = []) {
  return res.status(status).json({
    error: {
      code,
      message,
      details,
    },
    meta: {
      requestId: res.locals.requestId || null,
      timestamp: new Date().toISOString(),
    },
  });
}

module.exports = {
  ok,
  error,
};
