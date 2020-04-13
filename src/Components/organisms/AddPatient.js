import React, {Component} from 'react';
import {View} from 'react-native';
import {Searchbar} from 'react-native-paper';
import AppHeader from '../../Components/organisms/Header';
import AddPatientsList from '../../Components/organisms/AddPatientsList';

export default class AddPatient extends Component {
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
          placeholder="Buscar"
          onChangeText={query => {
            this.setState({firstQuery: query});
          }}
          value={firstQuery}
        />
        <View style={{flex: 1}}>
          <AddPatientsList
            query={this.state.firstQuery}
            data={this.props.route.params}
          />
        </View>
      </View>
    );
  }
}
