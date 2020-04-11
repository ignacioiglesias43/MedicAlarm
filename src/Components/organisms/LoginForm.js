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
import {TextInput, Button, Switch, ActivityIndicator} from 'react-native-paper';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    isSwitchOn: false,
    loadNextPage: false,
    email: '',
    password: '',
  };
  login() {
    this.setState({loadNextPage: !this.state.loadNextPage});
    setTimeout(() => {
      auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
          firestore()
            .collection('users')
            .where('email', '==', this.state.email)
            .get()
            .then(data => {
              let dataBase = {};
              data.forEach(d => {
                dataBase = {id: d.id, data: d.data()};
                this.props.callBack(dataBase, true);
              });
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
            case 'auth/user-not-found':
              message = 'El correo electrónico ingresado no está registrado.';
              break;
            case 'auth/wrong-password':
              message = 'La contraseña ingresada es incorrecta.';
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
    const {isSwitchOn, loadNextPage} = this.state;
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
        <TextInput
          keyboardType="email-address"
          mode="outlined"
          autoCapitalize="none"
          autoCorrect={false}
          onSubmitEditing={() => this.passwordInput.focus()}
          label="Correo Electrónico"
          returnKeyType={'next'}
          value={this.state.email}
          onChangeText={email => this.setState({email: email})}
        />
        <TextInput
          underlineColorAndroid="#FF7058"
          autoCapitalize="none"
          mode="outlined"
          autoCorrect={false}
          label="Contraseña"
          returnKeyType={'go'}
          secureTextEntry
          ref={input => (this.passwordInput = input)}
          value={this.state.password}
          onChangeText={password => this.setState({password: password})}
        />
        <View style={styles.switchContainer}>
          <Text style={{color: 'white'}}>Recordarme</Text>
          <Switch
            value={isSwitchOn}
            color="#FF7058"
            onValueChange={() => {
              this.setState({isSwitchOn: !isSwitchOn});
            }}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            color="#FF7058"
            onPress={() => {
              if (this.state.email !== '' && this.state.password !== '') {
                this.login();
              } else {
                Alert.alert('Error', 'Todos los campos son necesarios');
              }
            }}>
            <Text style={{color: 'white'}}>Iniciar Sesión</Text>
          </Button>
        </View>
        <Text style={styles.hintText}>¿No tienes cuenta?</Text>
        <View style={styles.registerContainer}>
          <Button
            color="#FF7058"
            onPress={() => {
              this.props.navigation.push('Registro');
            }}>
            Registrate aquí
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
  switchContainer: {
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
