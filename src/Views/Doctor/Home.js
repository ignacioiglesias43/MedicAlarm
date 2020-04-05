import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Container, Content, Card, CardItem, Body, Right} from 'native-base';
import AppHeader from '../../Components/organisms/Header';
import MedicalAppointment from '../../Components/organisms/MedicalAppointment';
import MedicalAlarms from '../../Components/organisms/MedicalAlarms';
import {Avatar, Title, IconButton} from 'react-native-paper';
import auth from '@react-native-firebase/auth';

import firestore from '@react-native-firebase/firestore';
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      data: {},
    };
  }
  componentWillMount() {
    this.setUserData();
    console.log(this.props);
  }
  setUserData = () => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        firestore()
          .collection('users')
          .where('email', '==', user.email)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              console.log(doc.id, ' => ', doc.data());
              this.setState({
                id: doc.id,
                data: doc.data(),
              });
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };
  render() {
    const {data, id} = this.state;
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
            source={
              data.type === 'doctor'
                ? require('../../img/avatar.png')
                : require('../../img/usuario.png')
            }
            style={{backgroundColor: 'white'}}
          />
          <Title>
            {data.type === 'doctor'
              ? `Dr. ${data.name} ${data.last_name}`
              : `${data.name} ${data.last_name}`}
          </Title>
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
                        id: id,
                        name: data.name,
                        lastname: data.last_name,
                        professional_id: data.professional_id,
                        specialty: data.specialty,
                        mail: data.email,
                        phone: data.phone,
                        userType: data.type,
                      })
                    }
                  />
                </Right>
              </CardItem>
              <CardItem bordered>
                <Text>Nombre: {`${data.name} ${data.last_name}`}</Text>
              </CardItem>
              {data.type === 'doctor' && (
                <>
                  <CardItem bordered>
                    <Text>Cédula: {data.professional_id}</Text>
                  </CardItem>
                  <CardItem bordered>
                    <Text>Especialidad: {data.specialty}</Text>
                  </CardItem>
                </>
              )}
              <CardItem bordered>
                <Text>Correo: {data.email}</Text>
              </CardItem>
              <CardItem bordered>
                <Text>Teléfono: {data.phone}</Text>
              </CardItem>
            </Card>
            <Card>
              <CardItem header bordered>
                <Body>
                  <Title>
                    {data.type === 'doctor' ? 'Mis Citas' : 'Mis Alarmas'}
                  </Title>
                </Body>
                <Right>
                  <IconButton
                    icon="eye"
                    size={25}
                    onPress={() => this.props.navigation.navigate('Citas')}
                  />
                </Right>
              </CardItem>
              {data.type === 'doctor' ? (
                <>
                  <MedicalAppointment />
                </>
              ) : (
                <>
                  <MedicalAlarms />
                </>
              )}
            </Card>
          </Content>
        </Container>
      </View>
    );
  }
}
