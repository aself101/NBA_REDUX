import {
  FETCH_BOXSCORES, UNAUTH_USER
} from '../actions/types';

const initState = {
  loading: true,
  scores: [],
  date: ''
};

export default function(state = initState, action) {
  switch (action.type) {
    case FETCH_BOXSCORES:
      var standings = Object.assign({}, {
        eastStandings: action.payload.eastStandings,
        westStandings: action.payload.westStandings
      });
      // Split up state tree
      return Object.assign({}, {
        teams: action.payload.teams,
        gameInfo: action.payload.gameInfo,
        lastMeeting: action.payload.lastMeeting,
        standings: standings,
        date: action.date,
        loading: false
      });
    case UNAUTH_USER:
      return {};
    default:
      return state;
  }
}














/* END */
