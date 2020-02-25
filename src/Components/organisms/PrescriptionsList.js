import React, {Component} from 'react';
import {Container, Card, CardItem, Text, Body, Right} from 'native-base';
import {View, FlatList, Alert} from 'react-native';
import {IconButton, Title} from 'react-native-paper';
import data from '../../JSON/prescriptions.json';
import AwesomeAlert from 'react-native-awesome-alerts';
export default class PrescriptionsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
      alerTitle: 'Eliminar Receta Médica',
      alertMessage: '',
    };
  }
  showAlert = item => {
    this.setState({
      showAlert: true,
      alertMessage:
        'Está apunto de eliminar la receta médica del paciente ' +
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
              <Card>
                <CardItem header>
                  <Body>
                    <Title>{item.name}</Title>
                    <Text>{item.prescription}</Text>
                  </Body>
                  <Right>
                    <IconButton
                      icon="pencil"
                      size={20}
                      onPress={() => this.props.navigation.push('EditReceta')}
                    />
                    <IconButton
                      icon="trash-can-outline"
                      color="red"
                      size={20}
                      onPress={() => this.showAlert(item)}
                    />
                  </Right>
                </CardItem>
              </Card>
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
