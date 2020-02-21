import React, {Component} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import {Appbar} from 'react-native-paper';
import {NavigationDrawer} from '../organisms/NavigationDrawer';

export default class Header extends Component {
  constructor(props) {
    super(props);
  }
  openMenu = () => this.props.navigation.toggleDrawer();
  render() {
    return (
      <Appbar.Header style={{backgroundColor: '#afc9ff'}}>
        <Appbar.Action icon="menu" onPress={this.openMenu} />
        <Appbar.Content title={this.props.title} />
      </Appbar.Header>
    );
  }
}
