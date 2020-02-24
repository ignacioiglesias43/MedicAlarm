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
import MedicalAppointment from '../../Components/organisms/MedicalAppointment';
import {Avatar, Title, IconButton, Button} from 'react-native-paper';

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
                <Body>
                  <Title>Mis Datos</Title>
                </Body>
                <Right>
                  <IconButton
                    icon="pencil"
                    size={25}
                    onPress={() =>
                      this.props.navigation.push('EditPersonalInfo', {
                        name: 'Simi',
                        professional_id: 12345678,
                        speciality: 'Psiquiatría',
                        mail: 'dr_simi@similares.com',
                        phone: 6122192275,
                      })
                    }
                  />
                </Right>
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
            <Card>
              <CardItem header bordered>
                <Body>
                  <Title>Mis Citas</Title>
                </Body>
                <Right>
                  <IconButton
                    icon="eye"
                    size={25}
                    onPress={() => this.props.navigation.navigate('Citas')}
                  />
                </Right>
              </CardItem>
              <CardItem>
                <MedicalAppointment />
              </CardItem>
            </Card>
          </Content>
        </Container>
      </View>
    );
  }
}
