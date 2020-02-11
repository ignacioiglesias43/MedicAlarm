import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

export default class Login extends Component {
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container} enabled>
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          onSubmitEditing={() => this.passwordInput.focus()}
          placeholder="Correo Electrónico"
          returnKeyLabel="siguiente"
        />
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Contraseña"
          returnKeyLabel="entrar"
          secureTextEntry
          ref={input => (this.passwordInput = input)}
        />

        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
        <Text style={styles.hintText}>¿No tienes cuenta?</Text>
        <TouchableOpacity style={styles.registerContainer}>
          <Text style={styles.registerText}>Registrate aquí</Text>
        </TouchableOpacity>
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
    backgroundColor: 'red',
    paddingVertical: 10,
  },
  buttonText: {
    textAlign: 'center',
  },
  registerContainer: {
    paddingVertical: 5,
  },
  hintText: {
    paddingVertical: 10,
    textAlign: 'center',
  },
  registerText: {
    textAlign: 'center',
    color: 'red',
  },
});
