import React, {Component} from 'react';
import {View, ScrollView} from 'react-native';
import AppHeader from '../../Components/organisms/Header';
import MedicineList from '../../Components/organisms/MedicineList';
export default class Medicines extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <AppHeader
          title="Medicamentos"
          navigation={this.props.navigation}
          icon="menu"
          showAddAction={true}
          addIcon="plus"
          navigateRoute="AddMedicine"
        />
        <MedicineList navigation={this.props.navigation} />
      </View>
    );
  }
}
