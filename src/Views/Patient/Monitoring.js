import React, {Component} from 'react';
import {View, FlatList} from 'react-native';
import AppHeader from '../../Components/organisms/Header';
import AlarmTrackingList from './../../Components/organisms/AlarmTrackingList';
export default class Monitoring extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <AppHeader
          title="Seguimiento"
          navigation={this.props.navigation}
          icon="menu"
          showAddAction={true}
          addIcon="plus"
          navigateRoute="AddTrackingAlarm"
        />
        <View style={{flex: 1}}>
          <AlarmTrackingList />
        </View>
      </View>
    );
  }
}
