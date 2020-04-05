import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Dimensions} from 'react-native';
import LoginForm from './../Components/organisms/LoginForm';
const windowHeight = Dimensions.get('window').height;

export default class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <LoginForm
              navigation={this.props.navigation}
              callBack={this.props.route.params.callBack}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    top: windowHeight * 0.15,
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
