import React from 'react';
import { Row, Col } from 'reactstrap';

// Importing all components to be used within this file.
/* Auth/.... */
import Login from './components/login';
import Register from './components/register';

const Auth = props => {
  return (
    <Row>
      <Col />
      <Col lg={4}>
        {props.location.pathname === '/Auth/login' ? <Login /> : <Register />}
      </Col>
      <Col />
    </Row>
  );
};

export default Auth;
