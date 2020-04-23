import React, {Component} from 'react';
import {Container, Card, CardItem, Text, Body, Right} from 'native-base';
import {View, FlatList, Alert, StyleSheet} from 'react-native';
import {IconButton, Title, Subheading} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
export default class AppointmentsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: [],
      refreshing: false,
    };
  }
  getAppointments() {
    firestore()
      .collection('appointments')
      .where('doctor.email', '==', this.props.doctor.data.email)
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
  deleteAppointment(id, index) {
    firestore()
      .collection('appointments')
      .doc(id)
      .delete()
      .then(() => {
        let newData = this.state.appointments;
        newData.splice(index, 1);
        this.setState({
          appointments: newData,
        });
        Alert.alert('Cita eliminada', 'Ha eliminado una cita con éxito.');
      })
      .catch(e => Alert.alert('Error', e.message));
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
    const {appointments, refreshing} = this.state;
    return (
      <Container>
        <View style={styles.mainStyle}>
          {appointments.length > 0 ? (
            <FlatList
              data={appointments}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => (
                <Card>
                  <CardItem header>
                    <Body>
                      <Title>{item.patient.name}</Title>
                      <Subheading>Fecha: {item.date}</Subheading>
                      <Subheading>Hora: {item.time.substr(0, 5)}</Subheading>
                    </Body>
                    <Right>
                      <IconButton
                        icon="pencil"
                        size={20}
                        onPress={() =>
                          this.props.navigation.push('EditCita', {
                            id: item.id,
                            doctor: this.props.doctor.data,
                            patient: item.patient,
                            hour: item.time,
                            date: item.date,
                          })
                        }
                      />
                      <IconButton
                        icon="trash-can-outline"
                        color="red"
                        size={20}
                        onPress={() =>
                          Alert.alert(
                            'Eliminar Cita',
                            'Está por eliminar la cita del paciente ' +
                              item.patient.name +
                              '.\n¿Desea Continuar?',
                            [
                              {
                                text: 'Cancelar',
                                style: 'cancel',
                              },
                              {
                                text: 'Eliminar',
                                onPress: () =>
                                  this.deleteAppointment(
                                    item.id,
                                    appointments.indexOf(item),
                                  ),
                              },
                            ],
                            {cancelable: false},
                          )
                        }
                      />
                    </Right>
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
                No hay registros de citas
              </Text>
            </View>
          )}
        </View>
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
