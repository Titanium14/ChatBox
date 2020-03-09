import React from 'react';
import { Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';

import './Auth.css';

import Login from './components/login';
import Register from './components/register';

const Auth = ({ location: { pathname } }) => (
  <Row className="m-spacing">
    <Col />
    <Col lg={4}>{pathname === '/Auth/login' ? <Login /> : <Register />}</Col>
    <Col />
  </Row>
);

Auth.propTypes = {
  location: PropTypes.object.isRequired
};

export default Auth;
