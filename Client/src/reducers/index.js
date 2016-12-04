import { combineReducers } from 'redux';
import authReducer from './auth_reducer';
import playersReducer from './players_reducer';
import boxscoresReducer from './boxscores_reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  players: playersReducer,
  boxscores: boxscoresReducer
});

export default rootReducer;
