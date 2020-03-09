import React from 'react';
import { Jumbotron, Container } from 'reactstrap';

const Welcome = () => (
  <Jumbotron className="m-spacing" fluid>
    <Container fluid>
      <h1 className="display-3 text-center">Welcome to ChatBox!</h1>
      <p className="lead text-center">
        A chatroom application where you can chat with a variety of people
        online!
      </p>
    </Container>
  </Jumbotron>
);

export default Welcome;
