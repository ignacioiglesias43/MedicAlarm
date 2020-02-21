import React, {Component} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import AppHeader from '../../Components/organisms/Header';
import MedicalAppointment from '../../Components/organisms/MedicalAppointment';
import {Avatar, Title, Button, Colors} from 'react-native-paper';

export default class Home extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <AppHeader title="Inicio" navigation={this.props.navigation} />
        <View
          style={{
            padding: 20,
            display: 'flex',
            alignItems: 'center',
          }}>
          <Avatar.Image
            size={130}
            source={require('../../img/avatar.png')}
            style={{backgroundColor: 'white'}}
          />
          <Title>Dr.Simi</Title>
        </View>
        <View>
          <MedicalAppointment />
          <Button
            icon="clipboard-plus"
            mode="outlined"
            color="#FF7058"
            onPress={() => console.log('Pressed')}
            style={{alignSelf: 'center'}}>
            Agendar Cita
          </Button>
        </View>
      </View>
    );
  }
}
