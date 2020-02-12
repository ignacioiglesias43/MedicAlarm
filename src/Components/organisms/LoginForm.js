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
    isSwitchOn: false,
    loadNextPage: false,
  };
  render() {
    const {isSwitchOn} = this.state;
    const {loadNextPage} = this.state;
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container} enabled>
        <TextInput
          keyboardType="email-address"
          mode="outlined"
          autoCapitalize="none"
          autoCorrect={false}
          onSubmitEditing={() => this.passwordInput.focus()}
          label="Correo Electrónico"
          returnKeyLabel="Sig."
        />
        <TextInput
          autoCapitalize="none"
          mode="outlined"
          autoCorrect={false}
          label="Contraseña"
          returnKeyLabel="entrar"
          secureTextEntry
          ref={input => (this.passwordInput = input)}
        />
        <View style={styles.switchContainer}>
          <Text>Recordarme</Text>
          <Switch
            value={isSwitchOn}
            color="#6200EE"
            onValueChange={() => {
              this.setState({isSwitchOn: !isSwitchOn});
            }}
          />
        </View>
        <TouchableOpacity style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={() => {
              this.setState({loadNextPage: !loadNextPage});
            }}>
            Iniciar Sesión
          </Button>
        </TouchableOpacity>
        <Text style={styles.hintText}>¿No tienes cuenta?</Text>
        <TouchableOpacity style={styles.registerContainer}>
          <Button>Registrate aquí</Button>
        </TouchableOpacity>
        <ActivityIndicator
          animating={loadNextPage}
          color="#6200EE"
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
  switchContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    paddingVertical: 10,
  },
});
