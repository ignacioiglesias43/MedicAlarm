import React, {Component} from 'react';
import {View, FlatList} from 'react-native';
import AppHeader from '../../Components/organisms/Header';
import AppointmentsList from '../../Components/organisms/AppointmentsList';
export default class Appointments extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <AppHeader
          title="Citas"
          navigation={this.props.navigation}
          icon="menu"
          showAddAction={true}
          addIcon="plus"
          navigateRoute="AddCita"
        />
        <View style={{flex: 1}}>
          <AppointmentsList navigation={this.props.navigation} />
        </View>
      </View>
    );
  }
}
