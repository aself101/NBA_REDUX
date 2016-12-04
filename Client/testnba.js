var nba = require('nba.js').default;

nba.stats.allPlayers()
  .then((res) => {
    const ALL_PLAYERS = res.CommonAllPlayers;
    console.log(ALL_PLAYERS);
}).catch((err) => { console.error(err); });
