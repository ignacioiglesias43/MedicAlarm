/**
 * Autor: Ignacio Iglesias Campoy
 * Fecha: 21-02-2020
 * Descripcion: Componente que muestra la lista de los pacientes
 */
import React, {Component} from 'react';
import {
  Container,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
} from 'native-base';
import {View, FlatList} from 'react-native';
import {IconButton} from 'react-native-paper';
import AwesomeAlert from 'react-native-awesome-alerts';
import data from '../../JSON/patientsAdded.json';
export default class PatientsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
      alerTitle: 'Eliminar Paciente',
      alertMessage: '',
    };
  }
  showAlert = item => {
    this.setState({
      showAlert: true,
      alertMessage:
        'Está apunto de eliminar de su lista de contactos al paciente ' +
        item.name +
        '. \n¿Desea continuar?',
    });
  };
  hideAlert = () => {
    this.setState({
      showAlert: false,
    });
  };
  render() {
    const {showAlert} = this.state;
    return (
      <Container>
        <View style={{flex: 1, flexDirection: 'column'}}>
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <List style={{padding: 20}}>
                <ListItem thumbnail icon>
                  <Left>
                    <Thumbnail
                      square
                      source={require('../../img/usuario.png')}
                    />
                  </Left>
                  <Body>
                    <Text>{item.name}</Text>
                  </Body>
                  <Right>
                    <IconButton
                      icon="trash-can-outline"
                      color="red"
                      onPress={() => this.showAlert(item)}
                    />
                  </Right>
                </ListItem>
              </List>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
          <AwesomeAlert
            show={showAlert}
            showProgress={false}
            title={this.state.alerTitle}
            message={this.state.alertMessage}
            closeOnTouchOutside={false}
            closeOnHardwareBackPress={false}
            showCancelButton={true}
            showConfirmButton={true}
            cancelText="Cancelar"
            confirmText="Eliminar"
            confirmButtonColor="#DD6B55"
            onCancelPressed={() => {
              this.hideAlert();
            }}
            onConfirmPressed={() => {
              this.hideAlert();
            }}
          />
        </View>
      </Container>
    );
  }
}
