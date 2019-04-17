import React, { Component } from 'react';
import _ from 'lodash';
import { Container, Row, Col, Button } from "reactstrap";

import LoginModal from "../components/LoginModal";
import RegistrationModal from "../components/RegistrationModal";
import CreateOrUpdateWidget from "../components/CreateOrUpdateWidget";
import UsersWidgets from "../components/UsersWidgets";
import SearchBar from "../components/SearchBar";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { saveLoginCredential } from '../actions';

class AppContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      error: null,
    };
  }

  componentDidMount() {
    this.fetchVisibleWidgets();
  }

  fetchVisibleWidgets(term = '') {
    fetch(`${process.env.REACT_APP_ROOT_URL}/api/v1/widgets/visible?client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}&term=${term}`, {
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

  removeLoginCredentials() {
    this.props.saveLoginCredential(undefined);
  }

  renderLoginModals = () => {
    if(typeof this.props.loginCredentials.credential === 'undefined') {
      return (
        <React.Fragment>
          <LoginModal buttonLabel="Login" />
          <RegistrationModal buttonLabel="Registration" />
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
          <Button color="danger" onClick={() =>  this.removeLoginCredentials() }>Logout</Button>
        </div>
      </React.Fragment>
    )
  }

  renderWidgetLists = () => {
    if(this.state.data.length) {
      return (
        <Row>
          <Col md="12">
            {this.state.data.map((item, index) => (
              <div className="widget-item" key={index}>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <strong>{item.kind}</strong>
                <div>
                  {this.props.loginCredentials.credential ? (
                    <Link to={`/users/${item.user.id}`}>
                      <Button color="primary">View User</Button>
                    </Link>
                  ) : null }
                </div>
              </div>
              )
            )}
          </Col>
        </Row>
      );
    } else {
      return <div>No visible widgets found</div>
    }
  }

  render() {
    const videoSearch = _.debounce((term) => {this.fetchVisibleWidgets(term)}, 300);
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
                <SearchBar onSearchTermChange={videoSearch} />
                <Row>
                  <Col md="12">
                    <div className="authentication">
                      {this.renderLoginModals()}
                    </div>
                  </Col>
                </Row>
                {this.renderWidgetLists()}
              </div>
            </Container>}
          />
        <Route path="/create_widgets/" render={() =>
          <CreateOrUpdateWidget 
            accessToken={this.props.loginCredentials.credential ? this.props.loginCredentials.credential.access_token : null}
            />} 
          />
        <Route path="/users/:id" render={(props) =>
          <UsersWidgets
            {...props}
            loginCredentials={this.props.loginCredentials.credential}
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ saveLoginCredential: saveLoginCredential }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
