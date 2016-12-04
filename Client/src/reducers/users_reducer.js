import {
  FETCH_USERS
} from '../actions';

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_USERS:
      return [...state, ...action.payload.data];
    default:
      return state;
  }
}














/* END */
