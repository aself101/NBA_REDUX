const nba = require('nba');
const _nba = require('nba.js').default;
/*
  Clean up of initial data pull
  Setup state tree for redux
*/
function processScoreBoard(stats) {
  var _keys = Object.keys(stats);
  let i, j, k;
  //console.log(_keys);

  var state = {
    teams: [],
    gameInfo: stats.gameHeader,
    lastMeeting: [],
    eastStandings: stats.eastConfStandingsByDay,
    westStandings: stats.westConfStandingsByDay
  };
  // Get lineScores
  for (j = 0; j < stats.lineScore.length; j++) {
    if (j % 2 === 0) {
      state.teams.push(
        Object.assign({}, {
          team1: stats.lineScore[j],
          team2: stats.lineScore[j+1]
        })
      );
    }
  }

  // Make sure the network request pulls all line up properly
  // There was an issue where the lineScores were not lining up with the lastMeetings
  for (i = 0; i < state.teams.length; i++) {
    for (k = 0; k < stats.lastMeeting.length; k++) {
      if (state.teams[i].team1.gameId === stats.lastMeeting[k].gameId) {
        state.lastMeeting.push(stats.lastMeeting[k]);
      }
    }
  }

  return state;
}


exports.boxscores = (req, res, next) => {
  const date = req.query.date;
  nba.stats.scoreboard({ gameDate: date })
    .then((stats) => {
      res.json({stats: processScoreBoard(stats)});
    })
    .catch((err) => {
      return next(err);
    });
}

exports.player = (req, res, next) => {
  const PlayerID = req.query.PlayerID;
  //const careerStats = _nba.stats.playerCareerStats({ PlayerID: PlayerID });
  const playerInfo = nba.stats.playerInfo({ PlayerID: PlayerID });
  const playerProfile = nba.stats.playerProfile({ PlayerID: PlayerID });

  //playerProfile.then((v) => console.log(Object.keys(v)));

  Promise.all([playerProfile, playerInfo])
    .then((stats) => {
      res.json({ playerStats: stats })
    })
    .catch((err) => {
      return next(err);
    });
  }



























/* END */
