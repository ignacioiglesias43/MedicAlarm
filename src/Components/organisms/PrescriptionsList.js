import React, {Component} from 'react';
import {Container, Card, CardItem, Text, Body, Right} from 'native-base';
import {View, FlatList, Alert, StyleSheet} from 'react-native';
import {IconButton, Title} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

export default class PrescriptionsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      prescriptions: [],
    };
  }
  componentWillMount() {
    this.getPrescriptions();
  }
  getPrescriptions() {
    firestore()
      .collection('prescriptions')
      .where('doctor.id', '==', this.props.doctor.id)
      .get()
      .then(data => {
        let dataBase = [];
        data.forEach(d => {
          dataBase.push({
            data: d.data(),
            id: d.id,
          });
        });
        this.setState({prescriptions: dataBase, refreshing: false});
      })
      .catch(e => {
        console.log(e);
      });
  }
  deletePrescription(id, index) {
    firestore()
      .collection('prescriptions')
      .doc(id)
      .delete()
      .then(() => {
        let newData = this.state.prescriptions;
        newData.splice(index, 1);
        this.setState({
          prescriptions: newData,
        });
        Alert.alert('Receta eliminada', 'Ha eliminado una receta con éxito.');
      })
      .catch(e => Alert.alert('Error', e.message));
  }
  handleRefresh = () => {
    this.setState(
      {
        refreshing: true,
      },
      () => {
        this.getPrescriptions();
      },
    );
  };
  render() {
    this.getPrescriptions();
    const {refreshing, prescriptions} = this.state;
    return (
      <Container>
        <View style={styles.mainStyle}>
          {prescriptions.length > 0 ? (
            <FlatList
              data={prescriptions}
              renderItem={({item}) => (
                <Card>
                  <CardItem header>
                    <Body>
                      <Title>{item.data.patient.data.name}</Title>
                      <FlatList
                        data={item.data.medicines}
                        renderItem={({item}) => (
                          <>
                            <Text>
                              -{' ' + item.name}: {item.indications}
                            </Text>
                          </>
                        )}
                        keyExtractor={item => item.id}
                      />
                    </Body>
                    <Right>
                      <IconButton
                        icon="pencil"
                        size={20}
                        onPress={() =>
                          this.props.navigation.push('EditReceta', {
                            id: item.id,
                            medicines: item.data.medicines,
                            doctor: item.data.doctor,
                            patient: item.data.patient,
                          })
                        }
                      />
                      <IconButton
                        icon="trash-can-outline"
                        color="red"
                        size={20}
                        onPress={() =>
                          Alert.alert(
                            'Eliminar Receta',
                            'Está por eliminar la receta médica del paciente ' +
                              `${item.data.patient.data.name}` +
                              '.\n¿Desea Continuar?',
                            [
                              {
                                text: 'Cancelar',
                                style: 'cancel',
                              },
                              {
                                text: 'Eliminar',
                                onPress: () =>
                                  this.deletePrescription(
                                    item.id,
                                    prescriptions.indexOf(item),
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
                No hay registros de recetas
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
