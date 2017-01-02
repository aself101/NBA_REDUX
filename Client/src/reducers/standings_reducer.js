import { FETCH_STANDINGS, FETCH_TANKATHON } from '../actions/types';


export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_STANDINGS:
      const standings = action.payload.standings;
      return Object.assign({}, state, {
        standings: standings
      });
    case FETCH_TANKATHON:
      const tankathon = action.payload.tankathon;
      return Object.assign({}, state, {
        tankathon: tankathon
      });
    default:
      return state;
  }
}
