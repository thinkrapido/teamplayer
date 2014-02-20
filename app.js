
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var moment = require('moment');

var app = express();

if (!global.App) {
  global.App = {};
}
global.App.dateMargin = moment('2014/06/15 12:00');
console.log('date margin:', global.App.dateMargin.lang('de').format('LLL'));

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'app_server/views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

require('./routes')(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
