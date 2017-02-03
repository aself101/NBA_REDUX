
import { FETCH_TEAM_NEWS, FETCH_ERROR } from '../actions/types';

const initState = {
  articles: [],
  team: null
};

export default function newsReducer(state = initState, action) {
  switch (action.type) {
    case FETCH_TEAM_NEWS:
      return Object.assign({}, action.payload, {
        team: action.team
      });
    case FETCH_ERROR:
      return state;
    default:
      return state;
  }
}
















/* END */
