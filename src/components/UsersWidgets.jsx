import React, { Component } from 'react';

import UsersWidgetsContainer from "../containers/UsersWidgetsContainer";

class UsersWidgets extends Component {
  render() {
    return <UsersWidgetsContainer {...this.props} loginCredentials={this.props.loginCredentials} />
  }
}

export default UsersWidgets;
