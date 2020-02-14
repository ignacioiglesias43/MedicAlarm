import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  TextInput,
  Button,
  Switch,
  ActivityIndicator,
  Colors,
} from 'react-native-paper';

export default class Login extends Component {
  state = {
    loadNextPage: false,
  };
  render() {
    const {loadNextPage} = this.state;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <TextInput
          mode="outlined"
          onSubmitEditing={() => this.emailInput.focus()}
          label="Nombre(s) y Apellidos"
          returnKeyType={'next'}
        />
        <TextInput
          keyboardType="email-address"
          mode="outlined"
          autoCapitalize="none"
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
          label="Teléfono"
          returnKeyType={'go'}
          keyboardType="phone-pad"
          ref={input => (this.phoneInput = input)}
        />
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            color="#FF7058"
            onPress={() => {
              this.setState({loadNextPage: !loadNextPage});
            }}>
            <Text style={{color: 'white'}}>Registrarse</Text>
          </Button>
        </View>
        <TouchableOpacity style={styles.registerContainer}>
          <Button color="#FF7058">Iniciar Sesión</Button>
        </TouchableOpacity>
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
});
