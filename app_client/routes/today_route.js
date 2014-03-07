
App.TodayRoute = Em.Route.extend({
  model: function() {
    return Em.$.getJSON('/api/matches').then(function(data) {
      return data.matches;
    });
  }

});