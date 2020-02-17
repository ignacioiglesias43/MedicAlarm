import React, {Component} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import {Appbar} from 'react-native-paper';

export default class Header extends Component {
  _goBack = () => console.log('Went back');

  _handleSearch = () => console.log('Searching');

  _handleMore = () => console.log('Shown more');
  render() {
    return (
      <Appbar.Header style={{backgroundColor: '#afc9ff'}}>
        <Appbar.Action icon="menu" onPress={this._goBack} />
        <Appbar.Content />
        <Appbar.Action icon="dots-vertical" onPress={this._handleMore} />
      </Appbar.Header>
    );
  }
}
