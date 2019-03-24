import React from 'react';
import { Row, Col, Button } from 'reactstrap';

import Welcome from './components/welcome';

const Home = () => {
  return (
    <>
      <Row noGutters>
        <Col />
        <Col md={10}>
          <Welcome />
        </Col>
        <Col />
      </Row>
      <Row noGutters>
        <Col />
        <Col md={10}>
          <Button href="/JoinRoom" color="primary" size="lg" block>
            Start chatting!
          </Button>
        </Col>
        <Col />
      </Row>
    </>
  );
};

export default Home;
