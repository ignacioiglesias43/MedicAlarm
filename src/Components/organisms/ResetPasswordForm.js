import React, {Component} from 'react';
import auth from '@react-native-firebase/auth';
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Image,
  Alert,
} from 'react-native';
import {TextInput, Button, ActivityIndicator} from 'react-native-paper';

export default class ResetPasswordForm extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    loadNextPage: false,
    email: '',
  };
  changePassword(email) {
    this.setState({
      loadNextPage: !this.state.loadNextPage,
    });
    setTimeout(() => {
      auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          Alert.alert(
            'Solicitud de cambio de contraseña enviada',
            'Se le ha enviado un correo electrónico para actualizar su contraseña.',
          );
        })
        .catch(() =>
          Alert.alert(
            'Error',
            'No se ha podido mandar el correo para cambio de contraseña.',
          ),
        );
      this.setState({
        loadNextPage: !this.state.loadNextPage,
      });
    }, 1000);
  }
  render() {
    const {loadNextPage, email} = this.state;
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
          onSubmitEditing={() => {
            if (email !== '') {
              this.changePassword(email);
            } else {
              Alert.alert('Error', 'Todos los campos son necesarios');
            }
          }}
          label="Correo Electrónico"
          returnKeyType={'go'}
          value={this.state.email}
          onChangeText={email => this.setState({email: email})}
        />
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            color="#FF7058"
            onPress={() => {
              if (this.state.email !== '') {
                this.changePassword(email);
              } else {
                Alert.alert('Error', 'Todos los campos son necesarios');
              }
            }}>
            <Text style={{color: 'white'}}>Actualizar Contraseña</Text>
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
