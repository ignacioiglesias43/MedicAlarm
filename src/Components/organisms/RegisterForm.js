import React, {Component} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Image,
  Alert,
} from 'react-native';
import {
  TextInput,
  Button,
  ActivityIndicator,
  RadioButton,
} from 'react-native-paper';

export default class RegisterForm extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    loadNextPage: false,
    checked: 'patient',
    name: '',
    lastName: '',
    mail: '',
    password: '',
    phone: '',
  };
  navigateBack() {
    setTimeout(() => {
      this.props.navigation.goBack();
    }, 1000);
  }
  register() {
    this.setState({loadNextPage: !this.state.loadNextPage});
    setTimeout(() => {
      auth()
        .createUserWithEmailAndPassword(
          this.state.mail.replace(/\s/g, ''),
          this.state.password.replace(/\s/g, ''),
        )
        .then(() => {
          firestore()
            .collection('users')
            .add({
              email: this.state.mail.trim(),
              name: `${this.state.name.trim()} ${this.state.lastName.trim()}`,
              phone: this.state.phone.trim(),
              type: this.state.checked.trim(),
            })
            .then(() => {
              this.props.navigation.push('Login');
              this.setState({loadNextPage: !this.state.loadNextPage});
            })
            .catch(error => {
              this.setState({loadNextPage: !this.state.loadNextPage});
              Alert.alert('Error', error.message);
            });
        })
        .catch(error => {
          this.setState({loadNextPage: !this.state.loadNextPage});
          let message = '';
          switch (error.code) {
            case 'auth/email-already-in-use':
              message =
                'El correo electrónico ingresado ya está registrado por otro usuario.';
              break;
            case 'auth/weak-password':
              message =
                'La contraseña ingresada es demasiado débil, debe tener por lo menos 6 caracteres.';
              break;
            case 'auth/invalid-email':
              message =
                'Correo electrónico inválido. Por favor ingrese un correo con el siguiente formato: algo@example.com';
              break;
            default:
              message =
                'Error de conexión, revise si se encuentra conectado a una red.';
          }
          Alert.alert('Error', message);
        });
    }, 1000);
  }
  render() {
    const {loadNextPage, checked} = this.state;
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="position"
        enabled>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('../../img/logo.png')} />
          <View style={styles.title}>
            <Text style={{fontSize: 25, color: 'white'}}>Medic</Text>
            <Text style={{fontSize: 25, color: '#FF7058'}}>Alarm</Text>
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TextInput
            style={{width: '48%'}}
            value={this.state.name}
            onChangeText={name => this.setState({name: name})}
            mode="outlined"
            onSubmitEditing={() => this.lastNameInput.focus()}
            label="Nombre"
            returnKeyType={'next'}
          />
          <TextInput
            style={{width: '48%'}}
            mode="outlined"
            value={this.state.lastName}
            onChangeText={lastName => this.setState({lastName: lastName})}
            ref={input => (this.lastNameInput = input)}
            onSubmitEditing={() => this.emailInput.focus()}
            label="Apellido"
            returnKeyType={'next'}
          />
        </View>
        <TextInput
          keyboardType="email-address"
          mode="outlined"
          autoCapitalize="none"
          value={this.state.mail}
          onChangeText={mail => this.setState({mail: mail})}
          autoCorrect={false}
          ref={input => (this.emailInput = input)}
          onSubmitEditing={() => this.passwordInput.focus()}
          label="Correo Electrónico"
          returnKeyType={'next'}
        />
        <TextInput
          autoCapitalize="none"
          mode="outlined"
          autoCorrect={false}
          value={this.state.password}
          onChangeText={password => this.setState({password: password})}
          label="Contraseña"
          returnKeyType={'next'}
          secureTextEntry
          ref={input => (this.passwordInput = input)}
          onSubmitEditing={() => this.phoneInput.focus()}
        />
        <TextInput
          autoCapitalize="none"
          mode="outlined"
          autoCorrect={false}
          value={this.state.phone}
          onChangeText={phone => this.setState({phone: phone})}
          label="Teléfono"
          returnKeyType={'go'}
          keyboardType="phone-pad"
          ref={input => (this.phoneInput = input)}
        />

        <View style={styles.radioButtonContainer}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{color: 'white'}}>
              Registrarme como:{'\t'}
              {'\t'}
              {'\t'}
              {'\t'}
              {'\t'}Paciente
            </Text>
            <RadioButton
              value="patient"
              color="#FF7058"
              status={checked === 'patient' ? 'checked' : 'unchecked'}
              onPress={() => {
                this.setState({checked: 'patient'});
              }}
            />
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{color: 'white'}}>Médico</Text>
            <RadioButton
              value="doctor"
              color="#FF7058"
              status={checked === 'doctor' ? 'checked' : 'unchecked'}
              onPress={() => {
                this.setState({checked: 'doctor'});
              }}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            color="#FF7058"
            onPress={() => {
              this.state.name !== '' &&
              this.state.lastName !== '' &&
              this.state.mail !== '' &&
              this.state.password !== '' &&
              this.state.phone !== ''
                ? this.register()
                : Alert.alert('Error', 'Todos los campos son necesarios');
            }}>
            <Text style={{color: 'white'}}>Registrarse</Text>
          </Button>
        </View>
        <View style={styles.registerContainer}>
          <Button
            color="#FF7058"
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            Iniciar Sesión
          </Button>
        </View>
        <ActivityIndicator
          animating={loadNextPage}
          color="#FF7058"
          size="large"
        />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    backgroundColor: 'white',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    paddingVertical: 10,
  },
  registerContainer: {
    paddingVertical: 5,
  },
  hintText: {
    paddingVertical: 10,
    textAlign: 'center',
    color: 'white',
  },
  registerText: {
    textAlign: 'center',
    color: 'red',
  },
  radioButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    paddingVertical: 10,
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
    marginBottom: 20,
  },
  logo: {
    height: 80,
    width: 80,
  },
  title: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
});
