import React, {Component} from 'react';
import {View} from 'react-native';
import AppHeader from '../../Components/organisms/Header';
import AppointmentsList from '../../Components/organisms/AppointmentsList';
export default class Appointments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctor: props.route.params.data,
    };
  }
  render() {
    const {doctor} = this.state;
    return (
      <View style={{flex: 1}}>
        <AppHeader
          title="Citas"
          navigation={this.props.navigation}
          icon="menu"
          showAddAction={true}
          addIcon="plus"
          navigateRoute="AddCita"
          data={doctor}
        />
        <View style={{flex: 1}}>
          <AppointmentsList
            navigation={this.props.navigation}
            doctor={doctor}
          />
        </View>
      </View>
    );
  }
}
