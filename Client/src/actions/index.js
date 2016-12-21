import axios from 'axios';
import { browserHistory } from 'react-router';
import nba from 'nba';

import {
  AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE, FETCH_PLAYERS,
  FETCH_BOXSCORES, FETCH_ERROR, FETCH_PLAYER
} from './types';

const ROOT_URL = 'http://localhost:3090';
const HEADSHOT_URL = 'https://nba-players.herokuapp.com/players';

function ajax(method, id, data) {
  return new Promise(function(resolve, reject) {
    $.ajax({
      type: method,
      url: `${ROOT_URL}/profile?${id}`,
      dataType: 'json',
      data: data,
      headers: { authorization: localStorage.getItem('token') },
      beforeSend: function(xhr) {
        console.log(`In beforeSend: ${xhr}`);
        return;
      },
      success: function(data) {
        resolve(data);
      },
      error: function(xhr, status, err) {
        reject(err.toString());
      },
      complete: function() {

      }
    });
  });
}

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
// Fetches data from server
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

/*****************************************************************************
  SYNCHRONOUS ACTIONS
*****************************************************************************/
export function fetchPlayers() {
  return (dispatch) => {
      dispatch({ type: FETCH_PLAYERS, payload: nba.players });
  };
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

function fetchPlayerData(res, player, PlayerID) {
  var p = player.split(' ');
  // Nba.com img's
  var _url = `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${PlayerID}.png`;

  return {
    type: FETCH_PLAYER,
    payload: res,
    img: _url,
    name: player
  };
}







/* END */
