import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Container, Content, Card, CardItem, Body, Right} from 'native-base';
import AppHeader from '../../Components/organisms/Header';
import MedicalAppointment from '../../Components/organisms/MedicalAppointment';
import MedicalAlarms from '../../Components/organisms/MedicalAlarms';
import {Avatar, Title, IconButton} from 'react-native-paper';
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.route.params.data.id,
      data: props.route.params.data.data,
    };
  }
  callBack(data, id) {
    this.setState({
      id: id,
      data: data,
    });
  }
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
          {typeof data !== 'undefined' && (
            <Avatar.Image
              size={130}
              source={
                data.type === 'doctor'
                  ? require('../../img/avatar.png')
                  : require('../../img/usuario.png')
              }
              style={{backgroundColor: 'white'}}
            />
          )}
          <Title>
            {typeof data !== 'undefined'
              ? data.type === 'doctor'
                ? `Dr. ${data.name}`
                : `${data.name}`
              : ''}
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
                        professional_id: data.professional_id
                          ? data.professional_id
                          : '',
                        specialty: data.specialty ? data.specialty : '',
                        mail: data.email,
                        phone: data.phone,
                        userType: data.type,
                        callBack: this.callBack.bind(this),
                      })
                    }
                  />
                </Right>
              </CardItem>
              <CardItem bordered>
                <Text>
                  Nombre: {typeof data !== 'undefined' ? `${data.name}` : ''}
                </Text>
              </CardItem>
              {typeof data !== 'undefined' && data.type === 'doctor' && (
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
                <Text>
                  Correo: {typeof data !== 'undefined' ? data.email : ''}
                </Text>
              </CardItem>
              <CardItem bordered>
                <Text>
                  Teléfono: {typeof data !== 'undefined' ? data.phone : ''}
                </Text>
              </CardItem>
            </Card>
            <Card>
              <CardItem header bordered>
                <Body>
                  <Title>
                    {typeof data !== 'undefined'
                      ? data.type === 'doctor'
                        ? 'Mis Citas'
                        : 'Mis Alarmas'
                      : ''}
                  </Title>
                </Body>
                <Right>
                  <IconButton
                    icon="eye"
                    size={25}
                    onPress={() => {
                      const {navigation} = this.props;
                      if (typeof data !== 'undefined') {
                        data.type === 'doctor'
                          ? navigation.navigate('Citas')
                          : navigation.navigate('Alarmas');
                      }
                    }}
                  />
                </Right>
              </CardItem>
              {typeof data !== 'undefined' && data.type === 'doctor' ? (
                <>
                  <MedicalAppointment doctor={this.state.data} />
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
