import React, {Component, useState} from 'react';
import {View, Platform, Text} from 'react-native';
import {Content, Container} from 'native-base';
import {ActivityIndicator, Button, TextInput} from 'react-native-paper';
import AppHeader from '../../Components/organisms/Header';

export default class AddMedicine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sendForm: false,
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
          title="Agregar Medicamento"
          navigation={this.props.navigation}
          icon="arrow-left"
        />
        <Content padder>
          <TextInput
            label="Nombre"
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
