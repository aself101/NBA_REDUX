const nba = require('nba');
const _nba = require('nba.js').default;
const level = require('level');

const playersDB = level('./nba-dbs/playersDB');
const playerShotsDB = level('./nba-dbs/playerShotsDB');
const teamsDB = level('./nba-dbs/teamsDB');
const gamesDB = level('./nba-dbs/gamesDB');

const { processStandings, processScoreBoard,
  cleanUpTankathon, getTankathon, getAllPlayers,
  parseBoxScoreStats, getTeamFeeds } = require('./helpers');


/*******************************************************************************
  All Routes
*******************************************************************************/
exports.boxscores = (req, res, next) => {
  const date = req.query.date;
  gamesDB.get(date, (err, stats) => {
    if (err) {
      return nba.stats.scoreboard({ gameDate: date })
        .then((stats) => {
          return res.json({stats: processScoreBoard(stats)});
        })
        .catch((err) => {
          return next(err, null);
        });
    }
    return res.json({stats: JSON.parse(stats)});
  });
}

exports.boxscoresInfo = (req, res, next) => {
  const GameID = req.query.GameID;
  gamesDB.get(GameID, (err, stats) => {
    switch (true) {
      case (stats === undefined):
        return nba.stats.boxScore({ GameID: GameID })
          .then((stats) => {
            return res.json({ boxScoreStats: parseBoxScoreStats(stats)});
          })
          .catch((err) => {
            return next(err, null);
          });
      case err:
        return nba.stats.boxScore({ GameID: GameID })
          .then((stats) => {
            return res.json({ boxScoreStats: parseBoxScoreStats(stats)});
          })
          .catch((err) => {
            return next(err, null);
          });
      default:
        return res.json({ boxScoreStats: JSON.parse(stats)});;
    }
  });
}

exports.player = (req, res, next) => {
  const PlayerID = req.query.PlayerID;
  // try and first pull a player from leveldb
  playersDB.get(PlayerID, (err, stats) => {
    if (err) return next(err, null);

    playerShotsDB.get(PlayerID, (err, shots) => {
      if (err) return next(err, null);
      return res.json({
        playerStats: JSON.parse(stats),
        playerShots: JSON.parse(shots)
      });
    })
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

exports.news = (req, res, next) => {
  const ID = req.query.ID;
  getTeamFeeds(ID)
    .then((articles) => {
      res.json({ articles: articles });
    })
    .catch(err => {
      return next(err);
    });
}




















/* END */
