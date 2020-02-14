import React, {Component} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import {Appbar} from 'react-native-paper';

export default class Header extends Component {
  render() {
    return (
      <Appbar.Header style={{backgroundColor: '#FF7058'}}>
        <Appbar.BackAction onPress={this._goBack} />
        <Appbar.Content title="Paciente" />
        <Appbar.Action icon="magnify" onPress={this._handleSearch} />
        <Appbar.Action icon="dots-vertical" onPress={this._handleMore} />
      </Appbar.Header>
    );
  }
}
