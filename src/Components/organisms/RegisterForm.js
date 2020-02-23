import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import {
  TextInput,
  Button,
  Switch,
  ActivityIndicator,
  Colors,
  List,
  Checkbox,
  RadioButton,
} from 'react-native-paper';

export default class RegisterForm extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    loadNextPage: false,
    checked: 'patient',
  };
  navigateBack() {
    setTimeout(() => {
      this.props.navigation.goBack();
    }, 1000);
  }
  register() {
    this.setState({loadNextPage: !this.state.loadNextPage});
    setTimeout(() => {
      this.setState({loadNextPage: !this.state.loadNextPage});
      this.props.navigation.push('Login');
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
            mode="outlined"
            onSubmitEditing={() => this.lastNameInput.focus()}
            label="Nombre"
            returnKeyType={'next'}
          />
          <TextInput
            style={{width: '48%'}}
            mode="outlined"
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
              this.register();
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
