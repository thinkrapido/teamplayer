
module.exports = function(app) {
  require('./main')(app);
  require('./resources')(app);
  require('./maintenance')(app);
}