const nba = require('nba');
const _nba = require('nba.js').default;

const conferenceEast = {
  'ATL': 'ATL',
  'BOS': 'BOS',
  'BKN': 'BKN',
  'CHA': 'CHA',
  'CHI': 'CHI',
  'CLE': 'CLE',
  'DET': 'DET',
  'IND': 'IND',
  'MIA': 'MIA',
  'MIL': 'MIL',
  'NYK': 'NYK',
  'ORL': 'ORL',
  'PHI': 'PHI',
  'TOR': 'TOR',
  'WAS': 'WAS'
};

const conferenceWest = {
  'DAL': 'DAL',
  'DEN': 'DEN',
  'GSW': 'GSW',
  'HOU': 'HOU',
  'LAC': 'LAC',
  'LAL': 'LAL',
  'MEM': 'MEM',
  'MIN': 'MIN',
  'NOP': 'NOP',
  'OKC': 'OKC',
  'PHX': 'PHX',
  'POR': 'POR',
  'SAC': 'SAC',
  'SAS': 'SAS',
  'UTA': 'UTA'
};

/*******************************************************************************
Clean up of initial data pull
Setup state trees for redux
*******************************************************************************/
function processScoreBoard(stats) {
  var _keys = Object.keys(stats);
  let i, j, k;

  var state = {
    teams: [],
    gameInfo: stats.gameHeader,
    lastMeeting: []
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

function processStandings(stats) {
  const standings = stats.league.standard.teams;
  const teams = nba.teams;
  var state = {
    east: [],
    west: []
  };
  let i, j;
  let sLength = standings.length;
  let tLength = teams.length;

  for (i = 0; i < sLength; i++) {
    for (j = 0; j < tLength; j++) {
      if ((standings[i].teamId === teams[j].teamId.toString()) && (conferenceEast[teams[j].abbreviation] === teams[j].abbreviation)) {
        state.east.push(Object.assign({}, standings[i], {
          abbreviation: teams[j].abbreviation,
          teamName: teams[j].teamName,
          location: teams[j].location
        }));
      } else if ((standings[i].teamId === teams[j].teamId.toString()) && (conferenceWest[teams[j].abbreviation] === teams[j].abbreviation)) {
        state.west.push(Object.assign({}, standings[i], {
          abbreviation: teams[j].abbreviation,
          teamName: teams[j].teamName,
          location: teams[j].location
        }));
      }
    }
  }

  return state;
}

/*******************************************************************************
  All Routes
*******************************************************************************/
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
  const playerInfo = nba.stats.playerInfo({ PlayerID: PlayerID });
  const playerProfile = nba.stats.playerProfile({ PlayerID: PlayerID });

  Promise.all([playerProfile, playerInfo])
    .then((stats) => {
      res.json({ playerStats: stats })
    })
    .catch((err) => {
      return next(err);
    });
  }

exports.standings = (req, res, next) => {
  _nba.data.standings()
    .then((stats) => {
      res.json({ standings: processStandings(stats) });
    })
    .catch((err) => {
      return next(err);
    });
}

























/* END */
