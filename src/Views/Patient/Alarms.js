import React, {Component} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import AppHeader from '../../Components/organisms/Header';
import AlarmList from '../../Components/organisms/AlarmList';
export default class Alarms extends Component {
  constructor(props) {
    super(props);
  }
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
        <View style={{flex: 1}}>
          <AlarmList navigation={this.props.navigation} />
        </View>
      </View>
    );
  }
}
