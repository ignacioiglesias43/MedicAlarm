import React, {Component} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import AppHeader from '../../Components/organisms/Header';
import PatientPrescriptionList from '../../Components/organisms/PatientPrescriptionList';
export default class Prescriptions extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <AppHeader
          title="Recetas"
          navigation={this.props.navigation}
          icon="menu"
        />
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <PatientPrescriptionList navigation={this.props.navigation} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: '30%',
  },
});
