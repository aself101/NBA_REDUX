/*
  General helpers and cleanup functions for data
  pulled from nba api's
*/
const osmosis = require('osmosis');
const nba = require('nba');
const _nba = require('nba.js').default;
const feed = require('feed-read');

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

module.exports = conferenceEast;

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

module.exports = conferenceWest;
/* for news feeds */
const teamnames = {
  '1610612737': 'hawks',
  '1610612738': 'celtics',
  '1610612751': 'nets',
  '1610612766': 'hornets',
  '1610612741': 'bulls',
  '1610612739': 'cavaliers',
  '1610612742': 'mavericks',
  '1610612743': 'nuggets',
  '1610612765': 'pistons',
  '1610612744': 'warriors',
  '1610612745': 'rockets',
  '1610612754': 'pacers',
  '1610612746': 'clippers',
  '1610612747': 'lakers',
  '1610612763': 'grizzlies',
  '1610612748': 'heat',
  '1610612749': 'bucks',
  '1610612750': 'timberwolves',
  '1610612740': 'pelicans',
  '1610612752': 'knicks',
  '1610612760': 'thunder',
  '1610612753': 'magic',
  '1610612755': 'sixers',
  '1610612756': 'suns',
  '1610612757': 'blazers',
  '1610612758': 'kings',
  '1610612759': 'spurs',
  '1610612761': 'raptors',
  '1610612762': 'jazz',
  '1610612764': 'wizards'
};
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
  // Create closure
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
// Clean up boxscore team and player stats
module.exports.parseBoxScoreStats = function(stats) {
  const playerTeamStats = stats.resultSets;
  // Main state obj to be returned
  var boxScoreObj = {
    playerHeaders: {},
    players: {
      team1: [],
      team2: []
    },
    teamHeaders: {},
    teams: []
  };

  var playerStatsHeaders = {}, teamStatsHeaders = {};
  var playerStatObj = {}, teamStatObj = {};
  var playerStatArr = [], teamStatArr = [];
  var playersT1 = [], playersT2 = [];
  // Players - stats, headers
  var playerGameHeaders = playerTeamStats[0].headers;
  var playerGameStats = playerTeamStats[0].rowSet;
  // Teams - stats, headers
  var teamGameHeaders = playerTeamStats[1].headers;
  var teamGameStats = playerTeamStats[1].rowSet;

  // Headers obj for team/player table headers
  for (let item of playerGameHeaders) playerStatsHeaders[item] = item;
  for (let item of teamGameHeaders) teamStatsHeaders[item] = item;

  // Place each player in an obj with headers: stats structure
  // for ease of table display
  for (let player of playerGameStats) {
    for (let key in player) {
      if (player[key] === null) player[key] = '';
      playerStatObj[playerGameHeaders[key]] = player[key];
    }
    playerStatArr.push(playerStatObj);
    playerStatObj = {};
  }
  // Get Teams in array of obj
  for (let team of teamGameStats) {
    for (let key in team) {
      teamStatObj[teamGameHeaders[key]] = team[key];
    }
    teamStatArr.push(teamStatObj);
    teamStatObj = {};
  }
  // Split players into individual teams
  let teamAbbr = playerStatArr[0].TEAM_ABBREVIATION;
  for (let i = 0; i < playerStatArr.length; i++) {
    if (playerStatArr[i].TEAM_ABBREVIATION === teamAbbr) playersT1.push(playerStatArr[i]);
    else playersT2.push(playerStatArr[i]);
  }

  // TODO: Remove headers after modals are up

  boxScoreObj.players = {
    team1: playersT1,
    team2: playersT2
  };
  boxScoreObj.teams = teamStatArr;
  boxScoreObj.teamHeaders = teamStatsHeaders;

  return boxScoreObj;
}



module.exports.getTeamFeeds = function(ID) {
  var nbaUrl;
  switch (ID) {
    case 'espn':
      nbaUrl = 'http://www.espn.com/espn/rss/nba/news';
      return new Promise(function(resolve, reject) {
        feed(nbaUrl, (err, articles) => {
          if (err) reject(err);
          resolve(articles);
        });
      });
    case 'si':
      nbaUrl = 'http://www.si.com/rss/si_nba.rss';
      return new Promise(function(resolve, reject) {
        feed(nbaUrl, (err, articles) => {
          if (err) reject(err);
          resolve(articles);
        });
      });
    case ID:
      nbaUrl = `http://www.nba.com/${teamnames[ID]}/rss.xml`;
      return new Promise(function(resolve, reject) {
        feed(nbaUrl, (err, articles) => {
          if (err) reject(err);
          resolve(articles);
        });
      });
    default:
      return;
  }
}


















/* END */
