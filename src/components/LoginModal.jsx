import React, { Component } from 'react';

import LoginModalContainer from '../containers/LoginContainer';

class LoginModal extends Component {
  render() {
    return (
      <div>
        <LoginModalContainer buttonLabel="Login" />
      </div>
    );
  }
}

export default LoginModal;
