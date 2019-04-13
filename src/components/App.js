import React, { Component } from 'react';
import { Container, Row, Col } from "reactstrap";

import LoginModal from "./LoginModal";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      error: null,
    };
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/widgets/visible?client_id=e34f876cec711c5a4b63c5edc1093651b61cd57f2fc5ed864f559b0df80fd332&client_secret=ade78ffa9f5f5341a45df49e489aa0cfa0b875c5a903fbd7eaafaff122e3bf24', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => this.setState({ data }))
    .catch(error => this.setState({
      error,
      message: 'Something bad happened ' + error
  }))
  }

  render() {
    if(this.state.data !== null) {
      return (
        <div className="App">
          <h1>Widget Api</h1>
    
          <LoginModal buttonLabel="Login" />
          <Container>
            <Row>
              <Col md="12">
                {this.state.data.map((item, index) => (
                  <div className="widget-item" key={index}>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <strong>{item.kind}</strong>
                  </div>
                  )
                )}
              </Col>
            </Row>
          </Container>
        </div>
      );
    }
    return 'Error' + this.state.error;
  }
}
