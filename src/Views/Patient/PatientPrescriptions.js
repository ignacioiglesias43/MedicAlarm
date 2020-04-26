import React, {Component} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import AppHeader from '../../Components/organisms/Header';
import PatientPrescriptionList from '../../Components/organisms/PatientPrescriptionList';
export default class PatientPrescriptions extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <AppHeader
          title="Recetas"
          navigation={this.props.navigation}
          data={this.props.route.params.data}
          icon="menu"
        />
        <PatientPrescriptionList
          navigation={this.props.navigation}
          data={this.props.route.params.data}
        />
      </View>
    );
  }
}
