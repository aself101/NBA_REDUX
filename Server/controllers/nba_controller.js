const nba = require('nba');

/*
  Clean up of initial data pull
  Setup state tree for redux
*/
function processScoreBoard(stats) {
  /*var _keys = Object.keys(stats);
  console.log(_keys);
  */
  var state = [];
  // Get lineScores
  for (let j = 0; j < stats.lineScore.length; j++) {
    if (j % 2 === 0) {
      state.push(
        Object.assign({}, {
          team1: stats.lineScore[j],
          team2: stats.lineScore[j+1]
        })
      );
    }
  }



  return state;
}


exports.boxscores = (req, res, next) => {
  const date = req.query.date;
  nba.stats.scoreboard({ gameDate: date })
    .then((stats) => {
      console.log();
      res.json({stats: processScoreBoard(stats)});
    })
    .catch((err) => {
      return next(err);
    });
}





























/* END */
