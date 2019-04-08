import React from 'react';
import ReactDOM from 'react-dom';
import { Container, Row, Col } from 'reactstrap';

// This will import all of Bootstrap's styles to use within this app.
import 'bootstrap/dist/css/bootstrap.min.css';
// This will import the custom css file to use.
import './index.css';

// This will import the App.js to use as a component.
import App from './components/App/App';

// This line will use the ReactDOM to render in anything within App.js and
// store it within the HTML element containing the id of 'root'.
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
