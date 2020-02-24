import React, {Component} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import LoginForm from './../Components/organisms/LoginForm';
import RegisterForm from './../Components/organisms/RegisterForm';

export default class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <LoginForm navigation={this.props.navigation} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    top: '25%',
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
