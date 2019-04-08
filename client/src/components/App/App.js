/*
  App.js contains all the routes that can be accessed. It also contains both
  the navbar and the footer components.
  This file can be considered as the main hub for the website as it contains
  the entry points to the various webpages.
*/

import React, { Component } from 'react';
// This will import all parts needed for the Router to allow for navigation.
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// The following imports below are for Redux.
import jwt_decode from 'jwt-decode';
import { Provider } from 'react-redux';
import setAuthToken from '../../redux/utils/setAuthToken';
import { setCurrentUser, logoutUser } from '../../redux/actions/authActions';

// Importing the custom styles in.
import './App.css';

// Importing all components to be used within this file.
/* src/components/...... */
import Home from '../Home/Home';
import Auth from '../Auth/Auth';
import Dashboard from '../Dashboard/Dashboard';
import JoinRoom from '../JoinRoom/JoinRoom';
import LoadingSpinner from '../utils/loadingSpinner';
import PrivateRoute from '../utils/privateRoute';
import store from '../../redux/store';

/* App/...... */
import NavBar from './components/NavBar';
import Footer from './components/footer';

/*
  The following block of code performs two functions:
    1)  It will set the current user and store their information in
        local storage.
    2)  It will check if the auth token has been expired. If it has passed
        the expiration date (set to 3 hours), it will automatically log the
        user out and return to the login page.
*/

// Check for a token in local storage
if (localStorage.jwtToken) {
  // Sets the token retrieved from local storage
  setAuthToken(localStorage.jwtToken);
  // Decodes token and retrieves user's info and token expiration
  const decoded = jwt_decode(localStorage.jwtToken);
  // Sets user and authenticates user
  store.dispatch(setCurrentUser(decoded));

  // This block checks for the expiration and logouts user if applicable
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser(null));
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
              <Route
                exact
                path="/JoinRoom"
                render={obj => (
                  <JoinRoom location={obj.location} history={obj.history} />
                )}
              />
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
