import React, {Component} from 'react';
import {View, Alert} from 'react-native';
import {Content, Container} from 'native-base';
import firestore from '@react-native-firebase/firestore';
import {ActivityIndicator, Button, TextInput} from 'react-native-paper';
import AppHeader from '../../Components/organisms/Header';

export default class AddContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sendForm: false,
      nameText: '',
      phoneText: '',
      user: props.route.params.data,
    };
  }
  sendPrescription() {
    this.setState({sendForm: !this.state.sendForm});
    setTimeout(() => {
      firestore()
        .collection('trusted-contacts')
        .add({
          name: this.state.nameText.trim(),
          phone: this.state.phoneText.trim(),
          patient: this.state.user.data,
        })
        .then(() => {
          this.setState({sendForm: !this.state.sendForm});
          this.props.navigation.goBack();
        })
        .catch(e => {
          Alert.alert('Error', e.message);
        });
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
            onChangeText={text => this.setState({nameText: text})}
            returnKeyType={'next'}
            onSubmitEditing={() => this.phoneInput.focus()}
            mode="outlined"
            style={{paddingTop: 5}}
          />
          <TextInput
            label="No. Teléfono"
            ref={input => (this.phoneInput = input)}
            value={this.state.phoneText}
            onChangeText={text => this.setState({phoneText: text})}
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
              onPress={() => {
                if (this.state.nameText !== '' && this.state.phoneText !== '') {
                  this.sendPrescription();
                } else {
                  Alert.alert(
                    'Advertencia',
                    'Todos los campos son necesarios.',
                  );
                }
              }}>
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
