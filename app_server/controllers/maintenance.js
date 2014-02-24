
var moment = require('moment');
var util = require('util');
var mapData = require('./helper/mapData');

var startDate = moment('2014/06/10');

module.exports.adjustDatePage = function(req, res) {

  var i, date,
      baseDate = startDate.clone(),
      max = 40,
      dates = [[], [], []];

  for(i = 0; i < max; i++) {
    date = baseDate.add('days', 1);
    dates[i % dates.length].push({
      link: date.format('YYYY/MM/DD'),
      text: date.format('YYYY/MM/DD ddd')
    });
  }

  res.render('adjust-date', {
    title: 'Adjust Date',
    dates: dates,
    dateMargin: App.dateMargin
  });
}

module.exports.adjustDate = function(req, res) {
  mapData.adjustDate(moment(util.format('%s/%s/%s 12:00', req.param('year'), req.param('month'), req.param('day'))));

  res.redirect('/maintenance/adjust-date');
}