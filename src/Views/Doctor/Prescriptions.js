import React, {Component} from 'react';
import {View, FlatList, ScrollView} from 'react-native';
import AppHeader from '../../Components/organisms/Header';
import PrescriptionsList from '../../Components/organisms/PrescriptionsList';
export default class Prescriptions extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <AppHeader
          title="Recetas"
          navigation={this.props.navigation}
          icon="menu"
          showAddAction={true}
          addIcon="plus"
          navigateRoute="AddReceta"
        />
        <ScrollView>
          <PrescriptionsList navigation={this.props.navigation} />
        </ScrollView>
      </View>
    );
  }
}
