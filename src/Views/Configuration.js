import React, {Component} from 'react';
import {View, Text, Alert} from 'react-native';
import {Container, Content, Card, CardItem, Body, Right} from 'native-base';
import auth from '@react-native-firebase/auth';
import AppHeader from '../Components/organisms/Header';
import {
  Avatar,
  Title,
  IconButton,
  Button,
  ActivityIndicator,
} from 'react-native-paper';
export default class Configuration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      data: {},
      loadNextPage: false,
    };
  }
  changePassword(email) {
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert(
          'Solicitud de cambio de contraseña enviada',
          'Se le ha enviado un correo electrónico para actualizar su contraseña.',
        );
      })
      .catch(() =>
        Alert.alert(
          'Error',
          'No se ha podido mandar el correo para cambio de contraseña.',
        ),
      );
  }
  logout() {
    this.setState({loadNextPage: !this.state.loadNextPage});
    setTimeout(() => {
      auth()
        .signOut()
        .then(() => {
          this.props.route.params.callBack({}, false);
          this.setState({loadNextPage: !this.state.loadNextPage});
        })
        .catch(error => {
          Alert.alert('Error', error.message);
        });
    }, 1000);
  }
  componentWillMount() {
    let d = this.props.route.params.data();
    this.setState({
      id: d.id,
      data: d.data,
    });
  }
  render() {
    const {data, id, loadNextPage} = this.state;
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <AppHeader
          title="Configuracion"
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
            source={require('../img/logo.png')}
            style={{backgroundColor: 'white'}}
          />
        </View>
        <Container>
          <Content>
            <Card>
              <CardItem header bordered>
                <Body>
                  <Title>Configuración general</Title>
                </Body>
              </CardItem>
              <Button
                color="#FF7058"
                icon={'pencil'}
                onPress={() => {
                  this.changePassword(data.email);
                }}>
                Actualizar Contraseña
              </Button>
              <Button
                color="#FF7058"
                icon={'eye'}
                onPress={() => {
                  console.log('info');
                }}>
                Información de la aplicación
              </Button>
            </Card>
            <Card>
              <CardItem header bordered>
                <Body>
                  <Title>Otras opciones</Title>
                </Body>
              </CardItem>
              <Button
                color="#FF7058"
                icon={'logout'}
                onPress={() => {
                  this.logout();
                }}>
                Cerrar Sesión
              </Button>
            </Card>
            <ActivityIndicator
              animating={loadNextPage}
              color="#FF7058"
              size="large"
            />
          </Content>
        </Container>
      </View>
    );
  }
}
