
var fs = require('fs'),
    path = require('path'),
    mapData = require('./mapData');

var loadFile = function() {
  fs.readFile(Util.wikiFile, function(err, data) {
    if (err) throw err;

    data = '' + data;
    data = data.replace(/"/g, '\\"');
    data = data.replace(/'(<table.*)/g, '"$1" + ');
    data = data.replace(/(<\/?t[hdr].*)/g, '"$1" + ');
    data = data.replace(/<\/table>'/g, '"</table>"');
    data = data.replace(/Costa[^_]Rica/g, 'Costa Rica');

    eval('data = ' + data + ';');
  
    global.App.teams = mapData.teams(data);

    global.App.matches = mapData.matches(data);

  });
}

if (App.bootstraped == false) {
  require('./date').changeDate();
  loadFile();
  App.bootstraped = true;
}

module.exports.triggerWikiWatch = (function() {

  var isTriggeredWikiWatch = false;

  return function() {
    if (!isTriggeredWikiWatch) {
      fs.watchFile(Util.wikiFile, function(curr, prev) {
        if (curr.mtime > prev.mtime) {
          loadFile();
          console.log(Util.wikiFile, 'reloaded');
        }
      });
      isTriggeredWikiWatch = true;
    }
  }
}());


