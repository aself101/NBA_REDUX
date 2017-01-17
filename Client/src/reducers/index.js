import { combineReducers } from 'redux';
import authReducer from './auth_reducer';
import playersReducer from './players_reducer';
import playerReducer from './player_reducer';
import teamsReducer from './teams_reducer';
import teamReducer from './team_reducer';
import boxscoresReducer from './boxscores_reducer';
import standingsReducer from './standings_reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  players: playersReducer,
  player: playerReducer,
  teams: teamsReducer,
  team: teamReducer,
  boxscores: boxscoresReducer,
  standings: standingsReducer
});

export default rootReducer;
