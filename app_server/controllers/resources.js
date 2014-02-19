
var fs = require('fs');
var path = require('path');

var wikiFile = path.join(__dirname, '../resources/wiki.js');

var loadFile = function() {
  fs.readFile(wikiFile, function(err, data) {
    if (err) throw err;

    data = '' + data;
    data = data.replace(/"/g, '\\"');
    data = data.replace(/'(<table.*)/g, '"$1" + ');
    data = data.replace(/(<\/?t[hdr].*)/g, '"$1" + ');
    data = data.replace(/(<\/table>')/g, '"</table>"');

    eval ('global.App.wiki = ' + data + ';');
  });
}

loadFile();

fs.watchFile(wikiFile, function(curr, prev) {
  if (curr.mtime > prev.mtime) {
    loadFile();
    console.log(wikiFile, 'reloaded');
  }
});


module.exports.wiki = function(req, res) {
  res.writeHead(200, {'Content-Type': 'application/json', 'charset': 'utf-8'});
  res.write(JSON.stringify(global.App.wiki || {}));
  res.end();
}