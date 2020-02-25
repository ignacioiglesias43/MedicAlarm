import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Container, Header, Button, Icon} from 'native-base';
import {FAB, Searchbar} from 'react-native-paper';
import AppHeader from '../../Components/organisms/Header';

export default class AddAlarm extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <AppHeader
          title="Agregar Alarmas"
          navigation={this.props.navigation}
          icon="arrow-left"
        />
      </View>
    );
  }
}
