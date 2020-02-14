import React, {Component} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import AppHeader from './../Components/organisms/Header';

export default class Home extends Component {
  render() {
    return <AppHeader />;
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
