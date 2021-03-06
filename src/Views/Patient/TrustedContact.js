import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Searchbar} from 'react-native-paper';
import AppHeader from '../../Components/organisms/Header';
import ContactList from '../../Components/organisms/ContactList';

export default class TrustedContact extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    firstQuery: '',
  };
  navigate = () => {
    this.props.navigation.navigate('Agregar Contacto');
  };
  render() {
    const {firstQuery} = this.state;
    return (
      <View style={{flex: 1}}>
        <AppHeader
          title="Contactos de Confianza"
          navigation={this.props.navigation}
          icon="menu"
          showAddAction={true}
          data={this.props.route.params.data}
          addIcon="account-plus-outline"
          navigateRoute="AddContacto"
        />
        <Searchbar
          placeholder="Buscar"
          onChangeText={query => {
            this.setState({firstQuery: query});
          }}
          value={firstQuery}
        />
        <ContactList
          navigation={this.props.navigation}
          query={this.state.firstQuery}
          data={this.props.route.params.data}
        />
      </View>
    );
  }
}
