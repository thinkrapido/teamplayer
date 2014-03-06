/*
  Creates a new instance of an Ember application and
  specifies what HTML element inside index.html Ember
  should manage for you.
*/
window.Todos = Ember.Application.create({
  rootElement: window.TESTING ? '#qunit-fixture' : '#emberapp',
  LOG_TRANSITIONS: true
});

if (window.TESTING) {
  window.Todos.deferReadiness();
}

