import React, {Component} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import {Appbar} from 'react-native-paper';
import {NavigationDrawer} from '../organisms/NavigationDrawer';

export default class Header extends Component {
  constructor(props) {
    super(props);
  }
  headerAction = () => {
    if (this.props.icon === 'menu') {
      this.props.navigation.toggleDrawer();
    } else if (this.props.icon === 'arrow-left') {
      this.props.navigation.goBack();
    }
  };
  render() {
    return (
      <Appbar.Header style={{backgroundColor: '#afc9ff'}}>
        <Appbar.Action icon={this.props.icon} onPress={this.headerAction} />
        <Appbar.Content title={this.props.title} />
      </Appbar.Header>
    );
  }
}
