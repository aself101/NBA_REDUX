import axios from 'axios';
import { browserHistory } from 'react-router';
import nba from 'nba';

import {
  AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE, FETCH_PLAYERS,
  FETCH_BOXSCORES, FETCH_ERROR, FETCH_PLAYER, FETCH_TEAMS, FETCH_STANDINGS,
  FETCH_REG_SEASON_PLAYER_STATS, FETCH_CAREER_REG_SEASON_PLAYER_STATS,
  FETCH_TANKATHON, FETCH_BOXSCORE_TEAM_PLAYER_INFO
} from './types';

const ROOT_URL = 'http://localhost:3090';
export const TEAM_IMG_URL = `http://i.cdn.turner.com/nba/nba/assets/logos/teams/primary/web`;
export const PLAYER_IMG_URL = `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190`;
/*************************** ASYNC ACTIONS ***************************/
export function signinUser({email, password}) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then((response) => {
        // Save JSON Web Token to localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('email', email);
        // Authenticate user on redux front end
        dispatch({ type: AUTH_USER });
        // Send user to protected component
        browserHistory.push('/profile');
      })
      .catch(() => {
        dispatch(authError('Bad login Info'));
      });
  };
}

export function signupUser({email, password}) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signup`, { email, password })
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        dispatch({ type: AUTH_USER });
        browserHistory.push('/profile');
      })
      .catch(() => {
        dispatch(authError('Email is already in use'));
      });
  }
}
// Fetches basic boxscore data from server
export function fetchBoxScoresServer(date) {
  $('.scores').fadeOut();
  $('.loading').css('display','inline');
  return function(dispatch) {
    axios.get(`${ROOT_URL}/boxscores`, {
      params: {
        date: date
      },
      headers: { authorization: localStorage.getItem('token') }
    })
    .then((response) => {
      return JSON.parse(response.request.response);
    })
    .then((response) => {
      $('.loading').css('display','none');
      $('.scores').fadeIn();
      return dispatch(fetchBoxScores(response, date));
    })
    .catch((err) => {
      return error(err);
    });
  }
}
// Fetches more boxscore information from server
export function fetchBoxScoresTeamPlayerInfoServer(GameID) {
  $('.boxscore-player-table').fadeOut();
  return function(dispatch) {
    axios.get(`${ROOT_URL}/boxscoresInfo`, {
      params: {
        GameID: GameID
      },
      headers: { authorization: localStorage.getItem('token') }
    })
    .then((response) => JSON.parse(response.request.response))
    .then((response) => {
      $('.boxscore-player-table').fadeIn();
      dispatch(fetchBoxScoresTeamPlayerInfo(response));
    })
    .catch((err) => dispatch(error(err)));
  };
}
// Fetches player data for player profile
export function fetchPlayerDataServer(PlayerID, player) {
  // Split name: Lastname/firstname for headshot in profile
  $('#player-profile').fadeOut();
  $('.loading').css('display','inline');
  return function(dispatch) {
    axios.get(`${ROOT_URL}/player`, {
      params: {
        PlayerID: PlayerID
      },
      headers: { authorization: localStorage.getItem('token') }
    })
    .then((res) => JSON.parse(res.request.response))
    .then((res) => {
      $('#player-profile').fadeIn();
      $('.loading').css('display','none');
      return dispatch(fetchPlayerData(res, player, PlayerID));
    })
    .catch((err) => {
      return error(err);
    });
  }
}

export function fetchStandingsServer() {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/standings`, {
      headers: { authorization: localStorage.getItem('token') }
    })
    .then((res) => JSON.parse(res.request.response))
    .then((res) => {
      return dispatch(fetchStandings(res));
    })
    .catch((err) => {
      return dispatch(error(err));
    })
  }
}

export function fetchTankathonServer() {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/tankathon`, {
      headers: { authorization: localStorage.getItem('token') }
    })
    .then((res) => JSON.parse(res.request.response))
    .then((res) => dispatch(fetchTankathon(res)))
    .catch((err) => dispatch(error(err)));
  }
}

export function fetchPlayers() {
  return (dispatch) => {
      dispatch({ type: FETCH_PLAYERS, payload: nba.players });
  };
}

export function fetchTeams() {
  return (dispatch) => {
    dispatch({ type: FETCH_TEAMS, payload: nba.teams });
  }
}
/*****************************************************************************
  SYNCHRONOUS ACTIONS
*****************************************************************************/
export function fetchStandings(standings) {
  return {
    type: FETCH_STANDINGS,
    payload: standings
  };
}

export function fetchRegSeasonPlayerStats(e) {
  //$('#player-stats-table').fadeIn();
  return {
    type: FETCH_REG_SEASON_PLAYER_STATS,
    payload: e.currentTarget.id
  };
}

export function fetchCareerRegSeasonPlayerStats() {
  $('#player-stats-table').fadeIn();
  return {
    type: FETCH_CAREER_REG_SEASON_PLAYER_STATS
  };
}

export function fetchTankathon(standings) {
  return {
    type: FETCH_TANKATHON,
    payload: standings
  }
}

function error(err) {
  return {
    type: FETCH_ERROR,
    err
  };
}

// Displays Authentication error
function authError(err) {
  return {
    type: AUTH_ERROR,
    payload: err
  };
}
// Signs out user
export function signoutUser() {
  // Destroy JWT token
  localStorage.removeItem('token');
  localStorage.removeItem('email');
  return {
    type: UNAUTH_USER
  }
}

function fetchBoxScores(boxscores, date) {
  const b = boxscores.stats;
  return {
    type: FETCH_BOXSCORES,
    payload: b,
    date: date
  }
}

function fetchBoxScoresTeamPlayerInfo(stats) {
  return {
    type: FETCH_BOXSCORE_TEAM_PLAYER_INFO,
    payload: stats
  }
}

function fetchPlayerData(res, player, PlayerID) {
  var p = player.split(' ');
  // Nba.com img's
  var _url = `${PLAYER_IMG_URL}/${PlayerID}.png`;

  return {
    type: FETCH_PLAYER,
    payload: res,
    img: _url,
    name: player
  };
}







/* END */
