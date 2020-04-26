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
          data={this.props.route.params.data}
        />
        <AlarmList
          navigation={this.props.navigation}
          data={this.props.route.params.data}
        />
      </View>
    );
  }
}
