import React, {Component} from 'react';
import {Container, Card, CardItem, Text, Body, Right} from 'native-base';
import {View, FlatList, StyleSheet} from 'react-native';
import {Title} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
export default class PatientAppointmentsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.data,
      appointments: [],
      refreshing: false,
    };
  }
  getAppointments() {
    const {user} = this.state;
    firestore()
      .collection('appointments')
      .where('patient.email', '==', user.data.email)
      .get()
      .then(data => {
        let dataBase = [];
        data.forEach(d => {
          let dx = Object.assign(d.data(), {id: d.id});
          Object.assign(dx, {
            time: new Date(dx.date._seconds * 1000).toLocaleTimeString(),
          });
          dx.date = new Date(dx.date._seconds * 1000).toLocaleDateString();
          dataBase.push(dx);
        });
        this.setState({appointments: dataBase, refreshing: false});
      })
      .catch(e => console.log(e));
  }
  componentWillMount() {
    this.getAppointments();
  }
  handleRefresh = () => {
    this.setState(
      {
        refreshing: true,
      },
      () => {
        this.getAppointments();
      },
    );
  };
  render() {
    this.getAppointments();
    const {refreshing, appointments} = this.state;

    return (
      <Container>
        {appointments.length > 0 ? (
          <FlatList
            data={appointments}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <Card>
                <CardItem header>
                  <Body>
                    <Title>Dr. {item.doctor.name}</Title>
                    <Text>Fecha: {item.date}</Text>
                    <Text>Hora: {item.time.substr(0, 5)}</Text>
                  </Body>
                </CardItem>
              </Card>
            )}
            refreshing={refreshing}
            onRefresh={this.handleRefresh}
            keyExtractor={item => item.id}
          />
        ) : (
          <View style={styles.noRegisterView}>
            <Text style={styles.noRegisterViewText}>
              No hay registros de citas para usted
            </Text>
          </View>
        )}
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  mainStyle: {flex: 1, flexDirection: 'column'},
  noRegisterView: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: 250,
  },
  noRegisterViewText: {color: 'gray', fontStyle: 'italic', fontSize: 20},
});
