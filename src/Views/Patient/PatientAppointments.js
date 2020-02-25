import React, {Component} from 'react';
import {View, FlatList} from 'react-native';
import AppHeader from '../../Components/organisms/Header';
import PatientAppointmentsList from '../../Components/organisms/PatientAppointmentsList';
export default class Appointments extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <AppHeader
          title="Citas"
          navigation={this.props.navigation}
          icon="menu"
        />
        <View style={{flex: 1}}>
          <PatientAppointmentsList navigation={this.props.navigation} />
        </View>
      </View>
    );
  }
}
