
var ctrl = require('../app_server/controllers/maintenance');

module.exports = function(app) {
  app.get('/maintenance/adjust-date', ctrl.adjustDatePage);
  app.get('/maintenance/adjust-date/:year/:month/:day', ctrl.adjustDate);
}