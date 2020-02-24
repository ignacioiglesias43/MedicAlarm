import React, {Component, useState} from 'react';
import {View, Platform, Text} from 'react-native';
import {
  Picker,
  Content,
  Form,
  Item,
  Container,
  Icon,
  Textarea,
  DatePicker,
} from 'native-base';
import {ActivityIndicator, Button, TextInput} from 'react-native-paper';
import AppHeader from '../../Components/organisms/Header';

export default class AddAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sendForm: false,
      nameText: JSON.stringify(props.route.params.name).replace(/"/g, ''),
      idText: JSON.stringify(props.route.params.professional_id).replace(
        /"/g,
        '',
      ),
      specialityText: JSON.stringify(props.route.params.speciality).replace(
        /"/g,
        '',
      ),
      mailText: JSON.stringify(props.route.params.mail).replace(/"/g, ''),
      phoneText: JSON.stringify(props.route.params.phone).replace(/"/g, ''),
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
          title="Mis Datos"
          navigation={this.props.navigation}
          icon="arrow-left"
        />
        <Content padder>
          <TextInput
            label="Nombre"
            value={this.state.nameText}
            returnKeyType={'next'}
            onSubmitEditing={() => this.idInput.focus()}
            mode="outlined"
            style={{paddingTop: 5}}
          />
          <TextInput
            label="Cédula Profesional"
            value={this.state.idText}
            returnKeyType={'next'}
            ref={input => (this.idInput = input)}
            onSubmitEditing={() => this.specialityInput.focus()}
            mode="outlined"
            style={{paddingTop: 10}}
          />
          <TextInput
            label="Especialidad"
            returnKeyType={'next'}
            value={this.state.specialityText}
            ref={input => (this.specialityInput = input)}
            onSubmitEditing={() => this.emailInput.focus()}
            mode="outlined"
            style={{paddingTop: 10}}
          />
          <TextInput
            label="Correo"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            returnKeyType={'next'}
            ref={input => (this.emailInput = input)}
            onSubmitEditing={() => this.phoneInput.focus()}
            value={this.state.mailText}
            mode="outlined"
            style={{paddingTop: 10}}
          />
          <TextInput
            label="No. Teléfono"
            ref={input => (this.phoneInput = input)}
            value={this.state.phoneText}
            returnKeyType={'go'}
            keyboardType="phone-pad"
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
