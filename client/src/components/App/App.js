import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from '../../redux/store';
import { loadUser } from '../../redux/actions/auth';
import setAuthToken from '../../redux/utils/setAuthToken';

import './App.css';

import Home from '../Home/Home';
import Auth from '../Auth/Auth';
import Dashboard from '../Dashboard/Dashboard';
import Rooms from '../Rooms/Rooms';
import MessageBoard from '../MessageBoard/MessageBoard';
import LoadingSpinner from '../shared/components/loadingSpinner';
import PrivateRoute from '../shared/components/privateRoute';

import NavBar from './components/navBar';
import Footer from './components/footer';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Home} />
            {/* <PrivateRoute exact path="/Dashboard" component={Dashboard} /> */}
            <Route exact path="/Auth/login" component={Auth} />
            <Route exact path="/Auth/register" component={Auth} />
            <Route exact path="/Rooms" component={Rooms} />
            <Route exact path="/MessageBoard" component={MessageBoard} />
            <Route render={() => <LoadingSpinner />} />
          </Switch>
          <Footer />
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
