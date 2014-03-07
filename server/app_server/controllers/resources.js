
module.exports.matches = function(req, res) {
  var matches = global.App.matches.length ? { matches: global.App.matches } : {};
  res.writeHead(200, {'Content-Type': 'application/json', 'charset': 'utf-8'});
  res.write(JSON.stringify(matches, null, 4));
  res.end();
}