import React, {Component} from 'react';
import {View, FlatList, ScrollView} from 'react-native';
import AppHeader from '../../Components/organisms/Header';
import PrescriptionsList from '../../Components/organisms/PrescriptionsList';
import firestore from '@react-native-firebase/firestore';
export default class Prescriptions extends Component {
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
          title="Recetas"
          navigation={this.props.navigation}
          icon="menu"
          showAddAction={true}
          addIcon="plus"
          navigateRoute="AddReceta"
          data={doctor}
        />
        <PrescriptionsList navigation={this.props.navigation} doctor={doctor} />
      </View>
    );
  }
}
