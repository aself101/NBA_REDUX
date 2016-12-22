import { FETCH_STANDINGS } from '../actions/types';


export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_STANDINGS:
      const standings = action.payload.standings;
      return Object.assign({}, standings);
    default:
      return state;
  }
}
