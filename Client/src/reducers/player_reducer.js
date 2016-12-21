import { FETCH_PLAYER } from '../actions/types';


export default function playerReducer(state = {}, action) {
  switch (action.type) {
    case FETCH_PLAYER:
      const img = action.img;
      const playerStats = action.payload.playerStats[0];
      const playerInfo = Object.assign({}, action.payload.playerStats[1].commonPlayerInfo[0], {
        img
      });
      return Object.assign({}, {
        playerStats,
        playerInfo
      });
    default:
      return state;
  }
}
