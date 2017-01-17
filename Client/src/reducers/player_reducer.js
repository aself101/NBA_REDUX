import {
  FETCH_PLAYER, FETCH_REG_SEASON_PLAYER_STATS, FETCH_CAREER_REG_SEASON_PLAYER_STATS
} from '../actions/types';

export default function playerReducer(state = {}, action) {
  switch (action.type) {
    case FETCH_PLAYER:
      const img = action.img;
      const playerStats = action.payload.playerStats[0];
      const playerShots = action.payload.playerShots;
      const regSeasonLen = playerStats.seasonTotalsRegularSeason.length;
      //console.log('Seasons played: ' + regSeasonLen);
      const playerInfo = Object.assign({}, action.payload.playerStats[1].commonPlayerInfo[0], {
        img
      });
      //console.log(playerInfo);
      return Object.assign({}, state, {
        playerStats,
        playerInfo,
        playerShots,
        regSeasonSelected: playerStats.seasonTotalsRegularSeason[regSeasonLen - 1],
        postSeasonSelected: {},
        preSeasonSelected: {}
      });
    case FETCH_REG_SEASON_PLAYER_STATS:
      const seasonRequested = action.payload;
      var selectedSeason = state.playerStats.seasonTotalsRegularSeason.filter((season) => {
        return seasonRequested === season.seasonId
      });
      return Object.assign({}, state, {
        regSeasonSelected: selectedSeason[0]
      });
    case FETCH_CAREER_REG_SEASON_PLAYER_STATS:
      return Object.assign({}, state, {
        regSeasonSelected: state.playerStats.careerTotalsRegularSeason[0]
      });
    default:
      return state;
  }
}
