import React, { Fragment } from 'react';
import { Row, Col, Button } from 'reactstrap';

import Welcome from './components/welcome';

const Home = () => (
  <Fragment>
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
        <Button href="/Rooms" color="primary" size="lg" block>
          Start chatting!
        </Button>
      </Col>
      <Col />
    </Row>
  </Fragment>
);

export default Home;
