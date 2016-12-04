import {
  FETCH_PLAYERS, UNAUTH_USER
} from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_PLAYERS:
      return [...state, ...action.payload];
    case UNAUTH_USER:
      return [];
    default:
      return state;
  }
}
