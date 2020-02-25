import React, {Component} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import AppHeader from '../../Components/organisms/Header';

export default class Alarms extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <AppHeader
          title="Alarmas"
          navigation={this.props.navigation}
          icon="menu"
          showAddAction={true}
          addIcon="alarm-plus"
          navigateRoute="AddAlarm"
        />
      </View>
    );
  }
}
