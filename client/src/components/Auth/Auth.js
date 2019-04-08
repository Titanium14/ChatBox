import React from 'react';
import { Row, Col } from 'reactstrap';

// Importing the custom styles in.
import './Auth.css';

// Importing all components to be used within this file.
/* Auth/.... */
import Login from './components/login';
import Register from './components/register';

const Auth = props => {
  return (
    <Row className="m-spacing">
      <Col />
      <Col lg={4}>
        {props.location.pathname === '/Auth/login' ? <Login /> : <Register />}
      </Col>
      <Col />
    </Row>
  );
};

export default Auth;
