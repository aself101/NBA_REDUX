import {
  FETCH_BOXSCORES, FETCH_BOXSCORE_TEAM_PLAYER_INFO, UNAUTH_USER
} from '../actions/types';

const initState = {
  loading: true,
  scores: [],
  date: ''
};

export default function(state = initState, action) {
  switch (action.type) {
    case FETCH_BOXSCORES:
      // Split up state tree
      return Object.assign({}, state, {
        teams: action.payload.teams,
        gameInfo: action.payload.gameInfo,
        lastMeeting: action.payload.lastMeeting,
        date: action.date,
        loading: false,
        gameSelected: {}
      });
    case FETCH_BOXSCORE_TEAM_PLAYER_INFO:
      return Object.assign({}, state, {
        gameSelected: action.payload.boxScoreStats
      });
    case UNAUTH_USER:
      return {};
    default:
      return state;
  }
}














/* END */
