import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Container, Header, Icon} from 'native-base';
import {Button, Searchbar} from 'react-native-paper';
import AppHeader from '../../Components/organisms/Header';
import PatientsList from '../../Components/organisms/PatientsList';

export default class Patients extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    firstQuery: '',
  };
  navigate = () => {
    this.props.navigation.navigate('Agregar Paciente');
  };
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
        />
        <Searchbar
          placeholder="Buscar"
          onChangeText={query => {
            this.setState({firstQuery: query});
          }}
          value={firstQuery}
        />
        <View style={{flex: 1}}>
          <PatientsList />
        </View>
      </View>
    );
  }
}
