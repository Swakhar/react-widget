import React from "react";
import ReactDOM from "react-dom";
import { Container, Row, Col } from "reactstrap";

import LoginModal from "./LoginModal";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <h1>Widget Api</h1>

      <LoginModal buttonLabel="Login" />
      <Container>
        <Row>
          <Col md="12">
            <div className="widget-item">
              <h3>Swakhar 's Widget</h3>
              <p>Very Good Widget</p>
              <strong>Visible</strong>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
