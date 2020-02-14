import React, {Component} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import LoginForm from './../Components/organisms/LoginForm';
import RegisterForm from './../Components/organisms/RegisterForm';

export default class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={require('../img/logo.png')} />
            <View style={styles.title}>
              <Text style={{fontSize: 25, color: 'white'}}>Medic</Text>
              <Text style={{fontSize: 25, color: '#FF7058'}}>Alarm</Text>
            </View>
          </View>
          <View style={styles.formContainer}>
            <RegisterForm />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    top: 200,
    borderRadius: 38888,
    borderColor: 'black',
  },
  container: {
    flex: 1,
    backgroundColor: '#afc9ff',
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
  formContainer: {},
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
