import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Container, Header, Button, Icon} from 'native-base';
import {FAB, Searchbar} from 'react-native-paper';
import AppHeader from '../../Components/organisms/Header';
import AddPatientsList from '../../Components/organisms/AddPatientsList';

export default class AddPatients extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    firstQuery: '',
  };
  render() {
    const {firstQuery} = this.state;
    return (
      <View style={{flex: 1}}>
        <AppHeader
          title="Agregar Pacientes"
          navigation={this.props.navigation}
          icon="arrow-left"
        />
        <Searchbar
          placeholder="Search"
          onChangeText={query => {
            this.setState({firstQuery: query});
          }}
          value={firstQuery}
        />
        <View style={{flex: 1}}>
          <AddPatientsList />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#afc9ff',
  },
});