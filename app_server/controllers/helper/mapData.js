
var moment = require('moment'),
    util = require('util'),
    _ = require('underscore');

var parseRawDate = function(string) {
  var regex = /, (\d+)\. (\w+) (\d+), (\d+):(\d+)[^(]+\((\d+):(\d+)/; 
    
  var result = regex.exec(string); 
  var dateString = util.format('%s.%s.%s %s:%s', result[1], result[2], result[3], result[6], result[7]); 
    
  return moment(dateString) 
}

var parseScore = function(string) {
  var regex = /^([-–\d]+):([-–\d]+) /;

  var result = regex.exec(string);
  result.shift();

  return [parseInt(result[0]), parseInt(result[1])];
}

var getFlag = function(team) {
  var out;
  out = global.App.teams;
  if (!out) return '';
  out = _.filter(out, function(item) {
    return item.team === team;
  });
  return out;
}

var createId = function(date, teamA, teamB) {
  return util.format('%s-%s-%s', date.format('YYYY/MM/DD HH:mm'), teamA, teamB);
}

var mapRawMatch = function(raw) {
  var score = parseScore(raw.resultat),
      date = parseRawDate(raw.beginn),
      out = {
    id: createId(date, raw.mannschaftA, raw.mannschaftB),
    played: date.isBefore(global.App.dateMargin),
    date: date,
    A: {
      flag: getFlag(raw.mannschaftA),
      country: raw.mannschaftA,
      score: score[0]
    },
    B: {
      flag: getFlag(raw.mannschaftB),
      country: raw.mannschaftB,
      score: score[1]
    }
  };
  return out;
}

var mapFlag = function(string) {
  string = string.replace('20px', '320px');
  string = string.replace('18px', '320px');
  return string;
}

module.exports.teams = function(data) {
  return _.map(data.mannschaften, function(raw) {
    return {
      team: raw.land,
      flag: mapFlag(raw.flagge)
    };
  });
}

module.exports.matches = function(data) {
  var matches = [];

  var matchesInAGroup = _.map(data.vorrunde.gruppen, function(obj) {
    return obj.spiele;
  });
  matches.push(matchesInAGroup);

  var matchesInKO = _.map(data.endrunde.ko_runde, function(obj) {
    return obj.spiele;
  });
  matches.push(matchesInKO);

  matches = _.flatten(matches);

  matches = _.map(matches, mapRawMatch);

  matches = _.sortBy(matches, 'id');

  return matches;
}