var Redis = require("ioredis");

var state = {
  db: null,
};

var MODE_TEST = "mode_test"
  , MODE_PRODUCTION = "mode_production";

exports.MODE_TEST = MODE_TEST;
exports.MODE_PRODUCTION = MODE_PRODUCTION;

exports.connect = function(mode) {
    
  state.db = new Redis(6379, '172.17.0.1');

  // Use different DB when testing
  if (mode === MODE_TEST) {
    state.db.select(15);
  }
}

exports.get = function() {
  return state.db;
}