
App.TodayController = Em.ArrayController.extend({
  nextMatches: function() {
    var count = 0;
    return _.filter(this.get('model'), function(item) {
      var out;
      if (count > 3) {
        return false;
      }
      out = !item.played;
      if (out) count++;
      return out;
    });
  }.property('model'),
  playedMatches: function() {
    var out = _.filter(this.get('model'), function(item) {
      return item.played;
    });
    return out.reverse();
  }.property('model'),
  nextDay: function() {
    var next = this.get('nextMatches')[0],
        out = '';
    if (next) {
      out = next.date;
    }
    return out;
  }.property('nextMatches'),
  prevDay: function() {
    var prev = this.get('playedMatches')[0],
        out = '';
    if (prev) {
      out = prev.date;
    }
    return out;
  }.property('playedMatches')
});