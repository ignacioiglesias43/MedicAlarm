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
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      data: {},
      loadNextPage: false,
    };
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
            source={
              data.type === 'doctor'
                ? require('../img/avatar.png')
                : require('../img/usuario.png')
            }
            style={{backgroundColor: 'white'}}
          />
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
                  <Title>Otras opciones</Title>
                </Body>
              </CardItem>
              <Button
                color="#FF7058"
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
