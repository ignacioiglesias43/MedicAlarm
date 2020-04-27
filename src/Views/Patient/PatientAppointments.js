import React, {Component} from 'react';
import {View} from 'react-native';
import AppHeader from '../../Components/organisms/Header';
import PatientAppointmentsList from '../../Components/organisms/PatientAppointmentsList';
export default class Appointments extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <AppHeader
          title="Citas"
          navigation={this.props.navigation}
          icon="menu"
        />
        <PatientAppointmentsList
          navigation={this.props.navigation}
          data={this.props.route.params.data}
        />
      </View>
    );
  }
}
