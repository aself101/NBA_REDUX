import {
  AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE
} from '../actions/types';



export default function authReducer(state = {}, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, authenticated: true, error: '' };
    case UNAUTH_USER:
      return { ...state, authenticated: false, error: '' };
    case AUTH_ERROR:
      return { ...state, authenticated: false, error: action.payload };
    case FETCH_MESSAGE:
      return { ...state, message: action.payload };
    default:
      return state;
  }
}





















/* END */
