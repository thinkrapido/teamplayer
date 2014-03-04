
module.exports.wiki = function(req, res) {
  res.writeHead(200, {'Content-Type': 'application/json', 'charset': 'utf-8'});
  res.write(JSON.stringify(global.App.matches || {}, null, 4));
  res.end();
}