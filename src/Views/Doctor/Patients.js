import React, {Component} from 'react';
import {View, ScrollView} from 'react-native';
import AppHeader from '../../Components/organisms/Header';
import PatientsList from '../../Components/organisms/PatientsList';

export default class Patients extends Component {
  render() {
    return (
      <ScrollView style={{flex: 1}}>
        <AppHeader title="Pacientes" />
        <PatientsList />
      </ScrollView>
    );
  }
}
