import React, { Component } from 'react';
import { Container, Row, Col } from "reactstrap";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import CreateOrUpdateWidget from "../components/CreateOrUpdateWidget";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { saveUsers } from '../actions';

class UsersWidgetsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      widgets: [],
    };
  }

  componentDidMount() {
    if(this.props.loginCredentials) {
      this.fetchAndUpdateUser();
      fetch(`${process.env.REACT_APP_ROOT_URL}/api/v1/users/${this.props.match.params.id}/widgets`, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + this.props.loginCredentials.access_token,
        }
      })
      .then(response => response.json())
      .then(widgets => this.setState({ widgets }))
      .catch(function() {
        console.log("Something Bad Occured");
      })
    }
  }

  fetchAndUpdateUser() {
    let user_ids = this.props.users.map(a => a.id);
    if(user_ids.includes(parseInt(this.props.match.params.id))) {
      this.props.users.map((user) => {
        if(user.id === parseInt(this.props.match.params.id))
          this.setState({ user })
          return null;
      })
    } else {
      fetch(`${process.env.REACT_APP_ROOT_URL}/api/v1/users/${this.props.match.params.id}`, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + this.props.loginCredentials.access_token,
        }
      })
        .then(response => response.json())
        .then(user => {
          this.setState({ user })
          this.props.saveUsers(this.state.user);
        })
        .catch(error => this.setState({
          error,
          message: 'Something bad happened ' + error
      }))
    }
  }

  deleteItem(item_id) {
    if(window.confirm('Are you sure you wish to delete this item?')) {
      return fetch(`${process.env.REACT_APP_ROOT_URL}/api/v1/widgets/${item_id}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + this.props.loginCredentials.access_token,
      }
    })
      .then(response => {
        response.json();
        this.props.history.goBack();
      })
      .catch(error => this.setState({
        error,
        message: 'Something bad happened ' + error
    }))
    } else {
      this.props.history.goBack();
    }
  }

  render() {
    if(typeof this.props.loginCredentials !== 'undefined' && this.state.user !== null) {
      return (
        <Router>
          <div className="App">
            <Route path="/users/:id"  render={() =>
              <Container>
                <Row>
                  <Col md="12">
                    <h3>{this.state.user.email}</h3>
                    <h5>{this.state.user.username}</h5>
                    {this.state.widgets.map((item, index) => (
                      <div className="widget-item" key={index}>
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                        <strong>{item.kind}</strong>
                        {this.props.loginCredentials.email === this.state.user.email ? (
                          <div>
                            <Link to={`/update_widgets/${item.id}`}>Update Widget</Link> {"     "}
                            <Link 
                              to={`/delete_widget/${item.id}`}
                              onClick={() =>  this.deleteItem(item.id) }
                            >
                              Delete Widget
                            </Link>
                          </div>
                        ) : null}
                      </div>
                      )
                    )}
                  </Col>
                </Row>
              </Container>
              }>
            </Route>
            <Route path="/update_widgets/:id" render={(props) =>
              <CreateOrUpdateWidget
                {...props}
                widgets={this.state.widgets}
                update="update"
                accessToken={this.props.loginCredentials.access_token}
            />}>
          </Route>
          </div>
        </Router>
      )
    }
    return (
    <div className="App">
      <Container>
        <Row>
          <Col md='12'>
            No user found! Please login again.
          </Col>
        </Row>
      </Container>
    </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    users: state.users,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ saveUsers: saveUsers }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersWidgetsContainer);
