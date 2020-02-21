import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Avatar, Title, IconButton} from 'react-native-paper';

export default class PatientsList extends Component {
  render() {
    return (
      <View>
        <View style={styles.container}>
          <View style={styles.principalView}>
            <View style={styles.content}>
              <Avatar.Image
                size={80}
                source={require('../../img/usuario.png')}
                style={{backgroundColor: 'white'}}
              />
              <View style={styles.contentRight}>
                <Title>Walter White</Title>
                <View>
                  <IconButton
                    icon="trash-can-outline"
                    color="red"
                    onPress={() => console.log('Pressed')}
                    style={{marginLeft: 50}}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  principalView: {
    display: 'flex',
    flexDirection: 'row',
    borderWidth: 3,
    borderRadius: 5,
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    margin: 10,
  },
  contentRight: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 40,
    paddingTop: 20,
  },
});
