import React, { Component } from 'react';

import AppContainer from '../containers/AppContainer';

export default class App extends Component {
  render() {
      console.log(process.env.MY_VAR_2);
      return <AppContainer />
  }
}
