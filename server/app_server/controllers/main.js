
var _ = require('underscore');

module.exports.index = function(req, res){
  var matches = App.matches,
      count = 0;

  res.render('index', { 
    title: 'Teamplayer',
    subTitle: 'Tippspiel f&uuml;r die Fu&szlig;ballweltmeisterschaft 2014',

    nextMatches: _.filter(matches, function(item) {
      var out;
      if (count > 3) {
        return false;
      }
      out = !item.played;
      if (out) count++;
      return out;
    }),

    playedMatches: _.filter(matches, function(item) {
      return item.played;
    }).reverse()

  });
};