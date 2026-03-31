const { error } = require("../http/response");

function notImplemented(moduleName) {
  return (req, res) => {
    return error(
      res,
      501,
      "NOT_IMPLEMENTED",
      `${moduleName} module is scaffolded but not implemented yet`
    );
  };
}

module.exports = {
  notImplemented,
};
