/**
 * @format
 */
import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import Splash from './src/Views/Splash';
import {name as appName} from './app.json';
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentScreen: 'Splash',
    };
    setTimeout(() => {
      this.setState({currentScreen: 'App'});
    }, 3000);
  }
  render() {
    const {currentScreen} = this.state;
    return currentScreen === 'Splash' ? <Splash /> : <App />;
  }
}
AppRegistry.registerComponent(appName, () => Main);
