
var moment = require('moment'),
    path = require('path'),
    fs = require('fs'),
    fse = require('fs-extra'),
    http = require('http'),
    bootstrap = require('./bootstrap');

var touchWikiFile = function() {
  var taggedFile = path.join(Util.dataFolder, App.dateMargin.format('YYYY-MM-DD') + '-wiki.js');
  var wikiFile = path.join(Util.dataFolder, 'wiki.js');

  fs.exists(taggedFile, function(exists) {
    if (exists) {
      fse.copy(taggedFile, wikiFile, function(err) {
        if (err) {
          console.error('%s could not be copied. %s', wikiFile, err);
        }
        else {
          bootstrap.triggerWikiWatch();
        }
      });
    }
    else {
      http.get(Util.wikiConverterUrl ,function(res) {
        var data = '';
        res.on("data",function(chunk){
          data += chunk;
//          console.log(chunk);
        });
        res.on("end",function(){
          fs.writeFile(taggedFile, data, function(err) {
            if (err) {
              console.error('%s could not be written. %s', taggedFile, err);
            }
            else {
              fse.copy(taggedFile, wikiFile, function(err) {
                if (err) {
                  console.error('%s could not be copied. %s', wikiFile, err);
                }
                else {
                  bootstrap.triggerWikiWatch();
                }
              });
            }
          });
        });
      });
    }
  });
}

module.exports.changeDate = function(date) {
  if(!date) {
    date = moment();
  }

  date = date.hour(12).minute(0).second(0);

  App.dateMargin = date;

  console.log('date margin:', App.dateMargin.lang('de').format('LLL'));

  touchWikiFile();
}