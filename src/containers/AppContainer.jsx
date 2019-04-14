import React, { Component } from 'react';
import { Container, Row, Col, Button } from "reactstrap";

import LoginModal from "../components/LoginModal";
import RegistrationModal from "../components/RegistrationModal";
import CreateWidget from "../components/CreateWidget";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { connect } from 'react-redux';

class AppContainer extends Component {
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

  renderLoginModals = () => {
    if(typeof this.props.loginCredentials.credential === 'undefined') {
      return (
        <React.Fragment>
          <LoginModal buttonLabel="Login" />
        </React.Fragment>
      )
    }
    return(
      <React.Fragment>
        <div>
          <Link to="/create_widgets/">
            <Button color="primary">Create New Widget</Button>
          </Link>
        </div>
        <div>
          <Button color="danger">Logout</Button>
        </div>
      </React.Fragment>
    )
  }

  renderWidgetLists = () => {
    if(this.state.data !== null) {
      return (
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
      );
    }
    return 'Error' + this.state.error;
  }

  render() {
    return (
      <Router>
        <Container>
          <Row>
          <Link to="/">
            <Button color="secondary">Home</Button>
          </Link>
          </Row>
        </Container>
        <Route path="/" exact 
            render={() => 
            <Container>
              <div className="App">
                <h1>Widget Api</h1>
                <Row>
                  <Col md="12">
                    <div className="authentication">
                      {this.renderLoginModals()}
                      <RegistrationModal buttonLabel="Registration" />
                    </div>
                  </Col>
                </Row>
                {this.renderWidgetLists()}
              </div>
            </Container>}
          />
        <Route path="/create_widgets/" render={() =>
          <CreateWidget 
            accessToken={this.props.loginCredentials.credential ? this.props.loginCredentials.credential.access_token : null}
            />} 
          />
      </Router>
    )
  }
}

function mapStateToProps(state) {
  return {
    loginCredentials: state.loginCredentials,
  };
}

export default connect(mapStateToProps)(AppContainer);
