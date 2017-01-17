const nba = require('nba');
const _nba = require('nba.js').default;
const level = require('level');

const playersDB = level('./playersDB');
const playerShotsDB = level('./playerShotsDB');
const teamsDB = level('./teamsDB');


const { processStandings, processScoreBoard,
  cleanUpTankathon, getTankathon, getAllPlayers,
  parseBoxScoreStats } = require('./helpers');



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
      return next(err, null);
    });
}

exports.boxscoresInfo = (req, res, next) => {
  const GameID = req.query.GameID;
  nba.stats.boxScore({ GameID: GameID })
    .then((stats) => {
      res.json({ boxScoreStats: parseBoxScoreStats(stats)});
    })
    .catch((err) => {
      return next(err, null);
    });
}

exports.player = (req, res, next) => {
  const PlayerID = req.query.PlayerID;
  // try and first pull a player from leveldb
  playersDB.get(PlayerID, (err, stats) => {
    if (err) return next(err, null);

    playerShotsDB.get(PlayerID, (err, shots) => {
      if (err) return next(err, null);
      res.json({
        playerStats: JSON.parse(stats),
        playerShots: JSON.parse(shots)
      });
    })
    //res.json({ playerStats: JSON.parse(stats) })
  });
}


exports.standings = (req, res, next) => {
  _nba.data.standings()
    .then((stats) => {
      res.json({ standings: processStandings(stats) });
    })
    .catch((err) => {
      return next(err, null);
    });
}

exports.tankathon = (req, res, next) => {
  const tank = getTankathon();
  tank.body.then((standings) => {
    res.json({ tankathon: cleanUpTankathon(standings)});
  })
  .catch((err) => {
    return next(err, null);
  })
}

exports.team = (req, res, next) => {
  const teamId = req.query.TeamID;

  teamsDB.get(teamId, (err, stats) => {
    if (err) return next(err, null);

    res.json({ teamStats: JSON.parse(stats) });
  });
}






















/* END */
