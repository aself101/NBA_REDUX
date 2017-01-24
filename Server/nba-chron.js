const nba = require('nba');
const _nba = require('nba.js').default;
const level = require('level');
const moment = require('moment');

const { processStandings, processScoreBoard,
  conferenceEast, conferenceWest,
  parseBoxScoreStats } = require('./controllers/helpers');

const teamsDB = level('./nba-dbs/teamsDB');
const gamesDB = level('./nba-dbs/gamesDB');
const playersDB = level('./nba-dbs/playersDB');
const playerShotsDB = level('./nba-dbs/playerShotsDB');

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
  if (!dateFrom || !dateTo) return;
  var dates = [];
  var dFrom = moment(dateFrom).format('MM-DD-YYYY');
  var dTo = moment(dateTo).format('MM-DD-YYYY');

  for (var m = moment(dFrom); m.diff(dTo, 'days') <= 0; m.add(1, 'days')) {
    dates.push(m.format('MM-DD-YYYY'));
  }

  return dates;
}

function getGamesInfo(isTodayOnly) {
  var today = moment().format('MM-DD-YYYY');

  if (isTodayOnly) {
    promiseGame(today);
  } else {
    // Example parameters: '10-25-2015', '10-25-2016'
    var dates = getArrayOfDates('10-25-2011', '10-25-2012');
    for (let date of dates) {
      promiseGame(date);
    }
  }

  function promiseGame(date) {
    return nba.stats.scoreboard({ gameDate: date })
      .then((stats) => {
        const processedStats = processScoreBoard(stats);

        for (let i = 0; i < processedStats.gameInfo.length; i++) {
          promiseBoxscoresInfo(processedStats.gameInfo[i].gameId);
        }
        saveGame(date, processedStats);
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




function* main() {
  /*yield getAllPlayersInfo();
  yield getAllTeamsInfo();
  yield getPlayerShots();*/
  yield getGamesInfo(true);
};

for (var func of main()) {}



































/* END */
