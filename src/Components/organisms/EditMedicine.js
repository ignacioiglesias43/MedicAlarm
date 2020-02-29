import React, {Component, useState} from 'react';
import {View, Platform, Text} from 'react-native';
import {Content, Container} from 'native-base';
import {ActivityIndicator, Button, TextInput} from 'react-native-paper';
import AppHeader from '../../Components/organisms/Header';

export default class EditMedicine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sendForm: false,
      nameText: JSON.stringify(props.route.params.name).replace(/"/g, ''),
      administrationRouteText: JSON.stringify(
        props.route.params.administration_route,
      ).replace(/"/g, ''),
    };
  }
  sendMedicine() {
    this.setState({sendForm: !this.state.sendForm});
    setTimeout(() => {
      this.setState({sendForm: !this.state.sendForm});
      this.props.navigation.goBack();
    }, 1000);
  }
  render() {
    const {sendForm} = this.state;
    return (
      <Container>
        <AppHeader
          title="Editar Medicamento"
          navigation={this.props.navigation}
          icon="arrow-left"
        />
        <Content padder>
          <TextInput
            label="Nombre"
            value={this.state.nameText}
            returnKeyType={'next'}
            onSubmitEditing={() => this.administrationRouteInput.focus()}
            mode="outlined"
            style={{paddingTop: 5}}
          />
          <TextInput
            label="Vía de asminitracion"
            autoCapitalize="none"
            returnKeyType={'go'}
            ref={input => (this.administrationRouteInput = input)}
            value={this.state.administrationRouteText}
            mode="outlined"
            style={{paddingTop: 10}}
          />
          <View style={{paddingTop: 15}}>
            <Button
              color="#FF7058"
              mode="contained"
              dark={true}
              onPress={() => this.sendMedicine()}>
              Enviar
            </Button>
          </View>
          <ActivityIndicator
            animating={sendForm}
            color="#FF7058"
            size="large"
            style={{paddingTop: 15}}
          />
        </Content>
      </Container>
    );
  }
}
