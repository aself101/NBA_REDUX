import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { AUTH_USER } from './actions/types';
import App from './components/app';
import SignUp from './components/auth/signup';
import SignIn from './components/auth/signin';
import SignOut from './components/auth/signout';
import Welcome from './components/welcome';
import RequireAuth from './components/auth/require_auth';
import Profile from './containers/profile';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducers, window.devToolsExtension && window.devToolsExtension());
const token = localStorage.getItem('token');

// If a token exists, consider the user signed in
if (token) {
  store.dispatch({ type: AUTH_USER});
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Welcome} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signout" component={SignOut} />
      </Route>
      <Route path="/profile" component={RequireAuth(Profile)}>
        <IndexRoute component={RequireAuth(Profile)} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app'));
