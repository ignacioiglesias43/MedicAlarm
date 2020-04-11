import React, {Component} from 'react';
import {View, Alert} from 'react-native';
import {Content, Container} from 'native-base';
import {ActivityIndicator, Button, TextInput} from 'react-native-paper';
import AppHeader from '../../Components/organisms/Header';
import firestore from '@react-native-firebase/firestore';
export default class EditPersonalInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sendForm: false,
      id: JSON.stringify(props.route.params.id).replace(/"/g, ''),
      nameText: JSON.stringify(props.route.params.name).replace(/"/g, ''),
      lastNameText: JSON.stringify(props.route.params.lastname).replace(
        /"/g,
        '',
      ),
      professionalIdText: JSON.stringify(
        this.props.route.params.professional_id,
      ).replace(/"/g, ''),
      specialityText: JSON.stringify(this.props.route.params.specialty).replace(
        /"/g,
        '',
      ),
      mailText: JSON.stringify(props.route.params.mail).replace(/"/g, ''),
      phoneText: JSON.stringify(props.route.params.phone).replace(/"/g, ''),
      type: JSON.stringify(props.route.params.userType).replace(/"/g, ''),
    };
  }
  sendPrescription() {
    this.setState({sendForm: !this.state.sendForm});
    if (this.state.type === 'doctor') {
      firestore()
        .collection('users')
        .doc(this.state.id)
        .update({
          email: this.state.mailText,
          name: this.state.nameText,
          last_name: this.state.lastNameText,
          professional_id: this.state.professionalIdText,
          specialty: this.state.specialityText,
          phone: this.state.phoneText,
        })
        .then(() => {
          setTimeout(() => {
            this.setState({sendForm: !this.state.sendForm});
            this.props.navigation.goBack();
          }, 1000);
        })
        .catch(error => Alert.alert('Error', error.message));
    } else {
      firestore()
        .collection('users')
        .doc(this.state.id)
        .update({
          email: this.state.mailText,
          name: this.state.nameText,
          last_name: this.state.lastNameText,
          phone: this.state.phoneText,
        })
        .then(() => {
          setTimeout(() => {
            this.setState({sendForm: !this.state.sendForm});
            this.props.navigation.goBack();
          }, 1000);
        })
        .catch(error => Alert.alert('Error', error.message));
    }
  }
  render() {
    const {
      sendForm,
      nameText,
      lastNameText,
      professionalIdText,
      specialityText,
      phoneText,
    } = this.state;
    if (this.props.route.params.userType === 'doctor') {
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
              value={nameText}
              returnKeyType={'next'}
              onSubmitEditing={() => this.lastNameInput.focus()}
              onChangeText={text => this.setState({nameText: text})}
              mode="outlined"
              style={{paddingTop: 5}}
            />
            <TextInput
              label="Apellido"
              value={lastNameText}
              returnKeyType={'next'}
              ref={input => (this.lastNameInput = input)}
              onChangeText={text => this.setState({lastNameText: text})}
              onSubmitEditing={() => this.idInput.focus()}
              mode="outlined"
              style={{paddingTop: 5}}
            />
            <TextInput
              label="Cédula Profesional"
              value={professionalIdText}
              onChangeText={text => this.setState({professionalIdText: text})}
              returnKeyType={'next'}
              ref={input => (this.idInput = input)}
              onSubmitEditing={() => this.specialityInput.focus()}
              mode="outlined"
              style={{paddingTop: 10}}
            />
            <TextInput
              label="Especialidad"
              returnKeyType={'next'}
              value={specialityText}
              onChangeText={text => this.setState({specialityText: text})}
              ref={input => (this.specialityInput = input)}
              onSubmitEditing={() => this.phoneInput.focus()}
              mode="outlined"
              style={{paddingTop: 10}}
            />
            <TextInput
              label="No. Teléfono"
              ref={input => (this.phoneInput = input)}
              onChangeText={text => this.setState({phoneText: text})}
              value={phoneText}
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
    } else if (this.props.route.params.userType === 'patient') {
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
              value={nameText}
              returnKeyType={'next'}
              onSubmitEditing={() => this.lastNameInput.focus()}
              onChangeText={text => this.setState({nameText: text})}
              mode="outlined"
              style={{paddingTop: 5}}
            />
            <TextInput
              label="Apellido"
              value={lastNameText}
              returnKeyType={'next'}
              ref={input => (this.lastNameInput = input)}
              onChangeText={text => this.setState({lastNameText: text})}
              onSubmitEditing={() => this.phoneInput.focus()}
              mode="outlined"
              style={{paddingTop: 5}}
            />
            <TextInput
              label="No. Teléfono"
              ref={input => (this.phoneInput = input)}
              value={phoneText}
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
}
