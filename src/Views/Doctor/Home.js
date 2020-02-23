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
} from 'native-base';
import AppHeader from '../../Components/organisms/Header';
import MedicalAppointment from '../../Components/organisms/MedicalAppointment';
import {Avatar, Title, IconButton} from 'react-native-paper';

export default class Home extends Component {
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
            source={require('../../img/avatar.png')}
            style={{backgroundColor: 'white'}}
          />
          <Title>Dr.Simi</Title>
        </View>
        <Container>
          <Content>
            <Card>
              <CardItem header bordered>
                <Title>Mis Datos</Title>
                <IconButton
                  icon="pencil"
                  size={25}
                  onPress={() => console.log('Pressed')}
                />
              </CardItem>
              <CardItem bordered>
                <Text>Nombre: Simi</Text>
              </CardItem>
              <CardItem bordered>
                <Text>Cédula: 12345678</Text>
              </CardItem>
              <CardItem bordered>
                <Text>Especialidad: Psiquiatría</Text>
              </CardItem>
              <CardItem bordered>
                <Text>Correo: dr_simi@similares.com</Text>
              </CardItem>
              <CardItem bordered>
                <Text>Teléfono: 6122192275</Text>
              </CardItem>
            </Card>
          </Content>
        </Container>
        {/* <View>
          <MedicalAppointment />
        </View>
        <Button
          icon="clipboard-plus"
          mode="contained"
          color="#FF7058"
          onPress={() => console.log('Pressed')}
          style={{alignSelf: 'center'}}>
          Agendar Cita
        </Button> */}
      </View>
    );
  }
}
