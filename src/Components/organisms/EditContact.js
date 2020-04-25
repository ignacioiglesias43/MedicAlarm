import React, {Component} from 'react';
import {View, Alert} from 'react-native';
import {Content, Container} from 'native-base';
import {ActivityIndicator, Button, TextInput} from 'react-native-paper';
import AppHeader from '../../Components/organisms/Header';
import firestore from '@react-native-firebase/firestore';
export default class EditContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sendForm: false,
      nameText: JSON.stringify(props.route.params.name).replace(/"/g, ''),
      phoneText: JSON.stringify(props.route.params.phone).replace(/"/g, ''),
    };
  }
  componentWillMount() {
    console.log(this.props.route.params.id);
  }
  sendPrescription() {
    const {nameText, phoneText} = this.state;
    const {route} = this.props;
    this.setState({sendForm: !this.state.sendForm});
    setTimeout(() => {
      firestore()
        .collection('trusted-contacts')
        .doc(route.params.id)
        .update({
          name: nameText.trim(),
          phone: phoneText.trim(),
          patient: route.params.patient.data,
        })
        .then(() => {
          this.setState({sendForm: !this.state.sendForm});
          this.props.navigation.goBack();
        })
        .catch(e => {
          this.setState({sendForm: !this.state.sendForm});
          Alert.alert('Error', e.message);
        });
    }, 1000);
  }
  render() {
    const {sendForm} = this.state;
    return (
      <Container>
        <AppHeader
          title="Editar Contacto"
          navigation={this.props.navigation}
          icon="arrow-left"
        />
        <Content padder>
          <TextInput
            label="Nombre"
            value={this.state.nameText}
            returnKeyType={'next'}
            onChangeText={text => this.setState({nameText: text})}
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
