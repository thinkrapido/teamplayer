
var matches = [
  {
    played: false,
    date: '12. Juni',
    A: {
      flag: 'http://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Flag_of_Mexico.svg/320px-Flag_of_Mexico.svg.png',
      country: 'Mexico',
      score: null,
      tip: null
    },
    B: {
      flag: 'http://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Flag_of_Honduras.svg/320px-Flag_of_Honduras.svg.png',
      country: 'Honduras',
      score: null,
      tip: 3
    }
  },
  {
    played: true,
    date: '12. Juni',
    A: {
      flag: 'http://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Flag_of_Mexico.svg/320px-Flag_of_Mexico.svg.png',
      country: 'Mexico',
      score: 3,
      tip: 2
    },
    B: {
      flag: 'http://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Flag_of_Honduras.svg/320px-Flag_of_Honduras.svg.png',
      country: 'Honduras',
      score: 3,
      tip: 1
    }
  },
  {
    played: true,
    date: '12. Juni',
    A: {
      flag: 'http://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Flag_of_Mexico.svg/320px-Flag_of_Mexico.svg.png',
      country: 'Mexico',
      score: 3,
      tip: 2
    },
    B: {
      flag: 'http://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Flag_of_Honduras.svg/320px-Flag_of_Honduras.svg.png',
      country: 'Honduras',
      score: 3,
      tip: 1
    }
  }
];

module.exports.index = function(req, res){
  res.render('index', { 
    title: 'Teamplayer',
    subTitle: 'Tippspiel f&uuml;r die Fu&szlig;ballweltmeisterschaft 2014',

    nextMatches: matches.filter(function(item) {
      return !item.played;
    }),

    playedMatches: matches.filter(function(item) {
      return item.played;
    })

  });
};