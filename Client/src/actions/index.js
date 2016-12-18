import axios from 'axios';
var nba = require('nba');
import { data, stats } from 'nba.js';

import { browserHistory } from 'react-router';


import {
  AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE, FETCH_PLAYERS,
  FETCH_BOXSCORES, FETCH_ERROR
} from './types';

const ROOT_URL = 'http://localhost:3090';

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
// Fetches data from server: Not set up to pull any data
export function fetchBoxScoresServer(date) {
  $('.scores').fadeOut();
  $('.loading').css('display','inline');
  return function(dispatch) {
    axios.get(`${ROOT_URL}/profile`, {
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
    });
  }
}
/* Fetches all NBA player objs
*/
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









/* END */
