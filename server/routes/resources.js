
var ctrl = require('../app_server/controllers/resources');

module.exports = function(app) {
  app.get('/api/wiki', ctrl.wiki);
};