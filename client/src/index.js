import React from 'react';
import ReactDOM from 'react-dom';
import { Container, Row, Col } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import App from './components/App/App';

ReactDOM.render(
  <Container fluid className="m-grid-container">
    <Row noGutters>
      <Col lg={12}>
        <App />
      </Col>
    </Row>
  </Container>,
  document.getElementById('root')
);
