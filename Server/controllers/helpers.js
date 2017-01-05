/*
  General helpers and cleanup functions for data
  pulled from nba api's
*/
const osmosis = require('osmosis');
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

// Clean up standings
module.exports.processStandings = function(stats) {
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
Clean up of initial data pull
Setup state trees for redux
*******************************************************************************/
module.exports.processScoreBoard = function(stats) {
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

// Main function to pull all values
module.exports.getTankathon = function() {
  // Table records
  var tableRecords = [];
  // Pull table body
  var body = new Promise(function(resolve, reject) {
    osmosis
      .get('http://www.tankathon.com/')
      .find('table > tr.pick-row > td')
      .set('row-picks')
      .data(function(row) {
        tableRecords.push(row);
        resolve(tableRecords);
      });
  });

  return {
    body: body
  };
}
/*
  Cleans up the tankathon array and places
  each team in its own obj, which can then be
  easily iterated through for table display
*/

module.exports.cleanUpTankathon = function(vals) {
  var tankathonArray = [];
  var tankObj = {};
  for (let i = 0; i < vals.length; i++) {
    if (i % 9 === 0) {}
    else {
      tankObj.team = vals[i]['row-picks'];
      i++;
      tankObj.record = vals[i]['row-picks'];
      i++;
      tankObj.winPct = vals[i]['row-picks'];
      i++;
      tankObj.gb = vals[i]['row-picks'];
      i++;
      tankObj.streak = vals[i]['row-picks'];
      i++;
      tankObj.l10 = vals[i]['row-picks'];
      i++;
      tankObj.top3 = vals[i]['row-picks'];
      i++;
      tankObj.num1Ovr = vals[i]['row-picks'];
      i++;
      tankathonArray.push(tankObj);
      tankObj = {};
    }
  }
  return tankathonArray;
}

/*
  Players DB Object
  After a res is sent, pull all players and cache serverside, so when a new req
  occurs, a new player can be served rapidly fast
  Using leveldb to cache nba players
*/
module.exports.getAllPlayers = function() {
  // Get all players and their IDs
  var players = nba.players;
  // Loop through all players and pull playerInfo and playerProfile
  for (let key of players) {
    var playerInfo = nba.stats.playerInfo({ PlayerID: key.playerId });
    var playerProfile = nba.stats.playerProfile({ PlayerID: key.playerId });

    Promise.all([playerProfile, playerInfo])
      .then((stats) => {
        playersDB.put(key.playerId, JSON.stringify(stats), (err) => {
          if (err) return console.log(err);
        });
      })
      .catch((err) => {
        return next(err);
      });
  }
  // Insert into leveldb
}




/* END */
