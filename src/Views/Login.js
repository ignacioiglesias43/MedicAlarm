import React, {Component} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import LoginForm from './../Components/organisms/LoginForm';

export default class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require('../img/Oikya_Front_Logo.png')}
            />
            <Text style={styles.title}>MedicAlarm</Text>
          </View>
          <View style={styles.formContainer}>
            <LoginForm />
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
    backgroundColor: '#2980b9',
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
    color: 'black',
    marginTop: 10,
    textAlign: 'center',
    fontSize: 25,
  },
});
