import {
  FETCH_BOXSCORES, UNAUTH_USER
} from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_BOXSCORES:
      return Object.assign({}, {
        scores: action.payload,
        date: action.date
      });
    case UNAUTH_USER:
      return {};
    default:
      return state;
  }
}














/* END */
