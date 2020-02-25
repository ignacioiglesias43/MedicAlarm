import React, {Component, useState} from 'react';
import {View, Platform, Text} from 'react-native';
import {Content, Container} from 'native-base';
import {ActivityIndicator, Button, TextInput} from 'react-native-paper';
import AppHeader from '../../Components/organisms/Header';

export default class AddContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sendForm: false,
      nameText: '',
      mailText: '',
      phoneText: '',
    };
  }
  sendPrescription() {
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
          title="Agregar Contacto"
          navigation={this.props.navigation}
          icon="arrow-left"
        />
        <Content padder>
          <TextInput
            label="Nombre"
            value={this.state.nameText}
            returnKeyType={'next'}
            onSubmitEditing={() => this.phoneInput.focus()}
            mode="outlined"
            style={{paddingTop: 5}}
          />
          <TextInput
            label="No. Teléfono"
            ref={input => (this.phoneInput = input)}
            onSubmitEditing={() => this.emailInput.focus()}
            value={this.state.phoneText}
            returnKeyType={'next'}
            keyboardType="phone-pad"
            mode="outlined"
            style={{paddingTop: 10}}
          />
          <TextInput
            label="Correo"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            returnKeyType={'go'}
            ref={input => (this.emailInput = input)}
            value={this.state.mailText}
            mode="outlined"
            style={{paddingTop: 10}}
          />
          <View style={{paddingTop: 15}}>
            <Button
              color="#FF7058"
              mode="contained"
              dark={true}
              onPress={() => this.sendPrescription()}>
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
