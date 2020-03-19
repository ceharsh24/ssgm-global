import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Container>
        <Row>
          <h1>Basic Setup</h1>
        </Row>
      </Container>
    </BrowserRouter>
  );
};

export default App;
