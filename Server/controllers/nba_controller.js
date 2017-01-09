const nba = require('nba');
const _nba = require('nba.js').default;
const level = require('level');

const playersDB = level('./playersDB');
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
    if (err) console.log(err);

    if (!stats) {
      const playerInfo = nba.stats.playerInfo({ PlayerID: PlayerID });
      const playerProfile = nba.stats.playerProfile({ PlayerID: PlayerID });

      Promise.all([playerProfile, playerInfo])
        .then((stats) => {
          res.json({ playerStats: stats })
        })
        .catch((err) => {
          return next(err, null);
        });
        // If no player, pull and create db
        getAllPlayers();
    }
    res.json({ playerStats: JSON.parse(stats) })
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























/* END */
