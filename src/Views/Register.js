import React, {Component} from 'react';
import {StyleSheet, View, Image, Text, SafeAreaView} from 'react-native';
import {Dimensions} from 'react-native';
import RegisterForm from './../Components/organisms/RegisterForm';
const windowHeight = Dimensions.get('window').height;
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
    top: windowHeight * 0.1,
  },
  container: {
    flex: 1,
    backgroundColor: '#afc9ff',
  },
});
