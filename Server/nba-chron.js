const nba = require('nba');
const _nba = require('nba.js').default;
const level = require('level');
const moment = require('moment');

const teamsDB = level('./teamsDB');
const gamesDB = level('./gamesDB');
const playersDB = level('./playersDB');
const playerShotsDB = level('./playerShotsDB');

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

/* Get all shots from all players */
function getPlayerShots() {

  var players = nba.players;

  nba.stats.shots()
    .then((v) => {
      var shots = v.shot_Chart_Detail;

      for (var key of players) {
        filterPlayerShots(key.playerId, key.fullName);
      }

      function filterPlayerShots(playerId, playerName) {
        var playerShots = [];
        for (var i = 0; i < shots.length; i++) {
          if (shots[i].playerId === playerId) playerShots.push(shots[i]);
        }
        savePlayerShots(playerId, playerName, playerShots);
      }

      function savePlayerShots(playerId, playerName, stats) {
        return playerShotsDB.put(playerId, JSON.stringify(stats), (err) => {
          if (err) return console.log(err);
          console.log('\n********************************************');
          console.log(`Updating shots of ${playerName}...`);
          console.log('********************************************\n');
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

/*
  Get all player information
  nba.players
  nba.stats.playerInfo({ PlayerID: key.playerId })
  nba.stats.playerProfile({ PlayerID: key.playerId })
*/
function getAllPlayersInfo() {
  var players = nba.players;

  for (var key of players) {
    promisePlayer(key.playerId, key.fullName);
  }

  function promisePlayer(playerId, playerName) {
    var playerInfo = nba.stats.playerInfo({ PlayerID: playerId });
    var playerProfile = nba.stats.playerProfile({ PlayerID: playerId });

    return Promise.all([playerProfile, playerInfo])
      .then((stats) => {
        savePlayer(playerId, playerName, stats);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function savePlayer(playerId, playerName, stats) {
    return playersDB.put(playerId, JSON.stringify(stats), (err) => {
      if (err) return console.log(err);
      console.log('\n********************************************');
      console.log(`Updating ${playerName}...`);
      console.log('********************************************\n');
    });
  }
}

/*
  A bit redundant pulling nba.shots for both players and teams
  Though data is pulled pretty much instantly from levelDB
*/
function getAllTeamsInfo() {
  var teams = nba.teams;

  for (var key of teams) {
    promiseTeam(key.teamId, key.teamName);
  }

  function promiseTeam(teamId, teamName) {
    var teamPlayerStats = nba.stats.playerStats({TeamID: key.teamId});
    var commonTeamRoster = nba.stats.commonTeamRoster({TeamID: key.teamId});
    var teamShooting = nba.stats.teamShooting({TeamID: key.teamId});
    var teamShots = nba.stats.shots({TeamID: key.teamId});

    return Promise.all([teamPlayerStats, commonTeamRoster, teamShooting, teamShots])
      .then((stats) => {
        saveTeam(teamId, teamName, stats);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function saveTeam(teamId, teamName, stats) {
    return teamsDB.put(teamId, JSON.stringify(stats), (err) => {
      if (err) return console.log(err);
      console.log('\n********************************************');
      console.log(`Saving & Updating ${teamName}...`);
      console.log('********************************************\n');
    });
  }

}


/*

 Stick to date formatting '1-19-2017'
*/
function getArrayOfDates(dateFrom, dateTo) {
  var dates = [];
  var dFrom = moment(dateFrom).format('MM-DD-YYYY');
  var dTo = moment(dateTo).format('MM-DD-YYYY');

  for (var m = moment(dFrom); m.diff(dTo, 'days') <= 0; m.add(1, 'days')) {
    dates.push(m.format('MM-DD-YYYY'));
  }

  return dates;
}

function getAllGamesInfo() {
  var today = moment().format('MM-DD-YYYY');
  var dates = getArrayOfDates('10-25-2015', '10-25-2016');
  //promiseGame('1-18-2017');
  for (let date of dates) {
    promiseGame(date);
  }

  function promiseGame(date) {
    return nba.stats.scoreboard({ gameDate: date })
      .then((stats) => {
        const processedStats = processScoreBoard(stats);

        for (let i = 0; i < processedStats.gameInfo.length; i++) {
          promiseBoxscoresInfo(processedStats.gameInfo[i].gameId);
        }
        //saveGame(date, processedStats);
      })
      .catch(err => { console.log(err) });
  }

  function promiseBoxscoresInfo(gameId) {
    return nba.stats.boxScore({ GameID: gameId })
      .then((stats) => {
        const parsedStats = parseBoxScoreStats(stats);
        saveGameAndPlayerStats(gameId, parsedStats);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function saveGame(date, stats) {
    gamesDB.put(date, JSON.stringify(stats), (err) => {
      if (err) return console.log(err);
      console.log('\n********************************************');
      console.log(`Saving Boxscores for ${date}...`);
      console.log('********************************************\n');
    });
  }

  function saveGameAndPlayerStats(gameId, stats) {
    gamesDB.put(gameId, JSON.stringify(stats), (err) => {
      if (err) return console.log(err);
      console.log('\n********************************************');
      console.log(`Saving Boxscore Team & Player data for Game #${gameId}...`);
      console.log('********************************************\n');
    })
  }


}




function parseBoxScoreStats(stats) {
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

  var playerGameHeaders = playerTeamStats[0].headers;
  var playerGameStats = playerTeamStats[0].rowSet;

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


function* main() {
  /*yield getAllPlayersInfo();
  yield getAllTeamsInfo();
  yield getPlayerShots();*/
  yield getAllGamesInfo();
};

for (var func of main()) {}



































/* END */
