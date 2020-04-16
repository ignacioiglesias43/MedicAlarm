import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Searchbar} from 'react-native-paper';
import AppHeader from '../../Components/organisms/Header';
import PatientsList from '../../Components/organisms/PatientsList';

export default class Patients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstQuery: '',
    };
  }
  render() {
    const {firstQuery} = this.state;
    return (
      <View style={{flex: 1}}>
        <AppHeader
          title="Pacientes"
          navigation={this.props.navigation}
          icon="menu"
          showAddAction={true}
          addIcon="account-plus-outline"
          navigateRoute="AddPaciente"
          data={this.props.route.params.data}
        />
        <Searchbar
          placeholder="Buscar"
          onChangeText={query => {
            this.setState({firstQuery: query});
          }}
          value={firstQuery}
        />
        <View style={{flex: 1}}>
          <PatientsList
            query={this.state.firstQuery}
            data={this.props.route.params.data}
          />
        </View>
      </View>
    );
  }
}
