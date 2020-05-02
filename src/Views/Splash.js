import React, {Component} from 'react';
import {StyleSheet, View, Dimensions, Image, Text} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
const windowHeight = Dimensions.get('window').height;

export default class Splash extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <View style={styles.logoContainer}>
              <Image style={styles.logo} source={require('../img/logo.png')} />
              <View style={styles.title}>
                <Text style={{fontSize: 25, color: 'white'}}>Medic</Text>
                <Text style={{fontSize: 25, color: '#FF7058'}}>Alarm</Text>
              </View>
              <Text style={{fontSize: 30, color: 'white', paddingTop: 25}}>
                Bienvenido...
              </Text>
              <ActivityIndicator
                animating={true}
                color="#FF7058"
                size="large"
                style={{paddingTop: 25}}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    top: windowHeight * 0.25,
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
