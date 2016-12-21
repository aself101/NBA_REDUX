import { combineReducers } from 'redux';
import authReducer from './auth_reducer';
import playersReducer from './players_reducer';
import boxscoresReducer from './boxscores_reducer';
import playerReducer from './player_reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  players: playersReducer,
  boxscores: boxscoresReducer,
  player: playerReducer
});

export default rootReducer;
