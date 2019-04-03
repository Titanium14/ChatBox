import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { Provider } from 'react-redux';
import setAuthToken from '../../redux/utils/setAuthToken';
import { setCurrentUser, logoutUser } from '../../redux/actions/authActions';

import './App.css';

import Home from '../Home/Home';
import Auth from '../Auth/Auth';
import Dashboard from '../Dashboard/Dashboard';
import JoinRoom from '../JoinRoom/JoinRoom';

import NavBar from './components/NavBar';
import Footer from './components/footer';
import LoadingSpinner from '../utils/loadingSpinner';

import store from '../../redux/store';

import PrivateRoute from '../utils/privateRoute';

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth off
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser(null));
    // Redirect to login
    window.location.href = '/Auth/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <>
            <NavBar />
            <Switch>
              <Route exact path="/" component={Home} />
              <PrivateRoute exact path="/Dashboard" component={Dashboard} />
              <Route exact path="/Auth/login" component={Auth} />
              <Route exact path="/Auth/register" component={Auth} />
              <Route exact path="/JoinRoom" component={JoinRoom} />
              <Route render={() => <LoadingSpinner />} />
            </Switch>
            <Footer />
          </>
        </Router>
      </Provider>
    );
  }
}

export default App;
