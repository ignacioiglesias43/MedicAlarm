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
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <TextInput
          keyboardType="email-address"
          mode="outlined"
          autoCapitalize="none"
          autoCorrect={false}
          onSubmitEditing={() => this.passwordInput.focus()}
          label="Correo Electrónico"
          returnKeyType={'next'}
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
        <TouchableOpacity style={styles.buttonContainer}>
          <Button
            mode="contained"
            color="#FF7058"
            onPress={() => {
              this.setState({loadNextPage: !loadNextPage});
            }}>
            <Text style={{color: 'white'}}>Iniciar Sesión</Text>
          </Button>
        </TouchableOpacity>
        <Text style={styles.hintText}>¿No tienes cuenta?</Text>
        <TouchableOpacity style={styles.registerContainer}>
          <Button color="#FF7058">Registrate aquí</Button>
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
