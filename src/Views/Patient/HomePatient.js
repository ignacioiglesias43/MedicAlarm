import React, {Component} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {
  Container,
  Form,
  Item,
  Input,
  Content,
  Card,
  CardItem,
  Body,
  Right,
} from 'native-base';
import AppHeader from '../../Components/organisms/Header';
import {Avatar, Title, IconButton, Button} from 'react-native-paper';
import MedicalAlarms from '../../Components/organisms/MedicalAlarms';

export default class HomePatient extends Component {
  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <AppHeader
          title="Inicio"
          navigation={this.props.navigation}
          icon="menu"
        />
        <View
          style={{
            padding: 20,
            display: 'flex',
            alignItems: 'center',
          }}>
          <Avatar.Image
            size={130}
            source={require('../../img/usuario.png')}
            style={{backgroundColor: 'white'}}
          />
          <Title>Ignacio Iglesias</Title>
        </View>
        <Container>
          <Content>
            <Card>
              <CardItem header bordered>
                <Body>
                  <Title>Mis Datos</Title>
                </Body>
                <Right>
                  <IconButton
                    icon="pencil"
                    size={25}
                    onPress={() =>
                      this.props.navigation.push('EditPersonalInfo', {
                        name: 'Ignacio',
                        lastname: 'Iglesias',
                        mail: 'iiglesiascampoy@gmail.com',
                        phone: 6122192275,
                        userType: 'patient',
                      })
                    }
                  />
                </Right>
              </CardItem>
              <CardItem bordered>
                <Text>Nombre: Ignacio Iglesias</Text>
              </CardItem>
              <CardItem bordered>
                <Text>Correo: iiglesiascampoy@gmail.com</Text>
              </CardItem>
              <CardItem bordered>
                <Text>Teléfono: 6122192275</Text>
              </CardItem>
            </Card>
            <Card>
              <CardItem header bordered>
                <Body>
                  <Title>Mis Alarmas</Title>
                </Body>
                <Right>
                  <IconButton
                    icon="eye"
                    size={25}
                    onPress={() => this.props.navigation.navigate('Alarmas')}
                  />
                </Right>
              </CardItem>
              <MedicalAlarms />
            </Card>
          </Content>
        </Container>
      </View>
    );
  }
}
