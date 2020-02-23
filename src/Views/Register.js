import React, {Component} from 'react';
import {StyleSheet, View, Image, Text, SafeAreaView} from 'react-native';
import RegisterForm from './../Components/organisms/RegisterForm';

export default class Register extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <RegisterForm navigation={this.props.navigation} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    top: 150,
  },
  container: {
    flex: 1,
    backgroundColor: '#afc9ff',
  },
});
