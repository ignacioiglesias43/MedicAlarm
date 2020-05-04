import React, {Component} from 'react';
import {Container, Card, CardItem, Body, Right, Text} from 'native-base';
import firestore from '@react-native-firebase/firestore';
import PushNotification from 'react-native-push-notification';
import {Title, IconButton, Subheading} from 'react-native-paper';
import {FlatList, View, Alert, StyleSheet} from 'react-native';

export default class AlarmList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.data,
      refreshing: false,
      alarms: [],
    };
  }
  getAlarms() {
    const {user} = this.state;
    firestore()
      .collection('alarms')
      .where('patient.data.email', '==', user.data.email)
      .get()
      .then(data => {
        let dataBase = [];
        data.forEach(d => {
          let dx = Object.assign(d.data(), {id: d.id});
          dataBase.push(dx);
        });
        this.setState({alarms: dataBase, refreshing: false});
      })
      .catch(e => console.log(e));
  }
  deleteAlarm(id, index, alarmId) {
    firestore()
      .collection('alarms')
      .doc(id)
      .delete()
      .then(() => {
        let newData = this.state.alarms;
        newData.splice(index, 1);
        this.setState({
          alarms: newData,
        });
        // PushNotification.clearLocalNotification(alarmId);
        Alert.alert('Alarma eliminada', 'Ha eliminado una alarma con éxito.');
      })
      .catch(e => Alert.alert('Error', e.message));
  }
  componentDidMount() {
    this.getAlarms();
  }
  handleRefresh = () => {
    this.setState(
      {
        refreshing: true,
      },
      () => {
        this.getAlarms();
      },
    );
  };
  render() {
    this.getAlarms();
    const {alarms, refreshing, user} = this.state;
    return (
      <Container>
        {alarms.length > 0 ? (
          <FlatList
            data={alarms}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <Card>
                <CardItem>
                  <Body>
                    <Title>{item.subject}</Title>
                    <Subheading>Siguiente hora: {item.next_hour}</Subheading>
                    <Subheading>Frecuencia: {item.frequency} hrs</Subheading>
                    {item.trusted_contact.name !== undefined && (
                      <Subheading>
                        Avisar a: {item.trusted_contact.name}
                      </Subheading>
                    )}
                  </Body>
                  <Right>
                    <IconButton
                      icon="pencil"
                      onPress={() =>
                        this.props.navigation.push('EditAlarm', {
                          id: item.id,
                          id_alarm: item.id_alarm,
                          subject: item.subject,
                          total_of_days: item.total_of_days,
                          hour: item.next_hour,
                          frequency: item.frequency,
                          trusted_contact: item.trusted_contact,
                          monitoring: item.monitoring,
                          user: user,
                        })
                      }
                    />
                    <IconButton
                      icon="trash-can-outline"
                      color="red"
                      onPress={() =>
                        Alert.alert(
                          'Eliminar Alarma',
                          'Está por eliminar la alarma ' +
                            item.subject +
                            '.\n¿Desea Continuar?',
                          [
                            {
                              text: 'Cancelar',
                              style: 'cancel',
                            },
                            {
                              text: 'Eliminar',
                              onPress: () =>
                                this.deleteAlarm(
                                  item.id,
                                  alarms.indexOf(item),
                                  item.id_alarm,
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
              No hay registros de alarmas
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
