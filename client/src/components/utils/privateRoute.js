import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// The following imports below are for Redux.
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// This creates a protected route that only authenticated users can access.
const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to="/Auth/login" />
      )
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

// This will take the array from the Redux store and map it onto the
// array saved in state.
const mapStateToProps = state => ({
  auth: state.auth
});

// The connect method connects this component to the Redux store.
export default connect(mapStateToProps)(PrivateRoute);
