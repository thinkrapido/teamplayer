
var _ = require('underscore');

module.exports.index = function(req, res){
  var matches = App.matches,
      count = 0;

  res.render('index');
};