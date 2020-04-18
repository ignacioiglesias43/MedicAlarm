import React, {Component} from 'react';
import {Container, Card, CardItem, Text, Body, Right} from 'native-base';
import {View, FlatList, Alert, StyleSheet} from 'react-native';
import {IconButton, Title, Subheading} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
export default class MedicineList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      medicines: [],
      refreshing: false,
    };
  }
  getMedicines() {
    firestore()
      .collection('medicines')
      .get()
      .then(data => {
        let dataBase = [];
        data.forEach(d => {
          let dx = Object.assign(d.data(), {id: d.id});
          dataBase.push(dx);
        });
        this.setState({medicines: dataBase, refreshing: false});
      })
      .catch(e => {
        console.log(e);
      });
  }
  deleteMedicine(id, index) {
    firestore()
      .collection('medicines')
      .doc(id)
      .delete()
      .then(() => {
        let newData = this.state.medicines;
        newData.splice(index, 1);
        this.setState({
          medicines: newData,
        });
        Alert.alert(
          'Medicamento eliminado',
          'Ha eliminado un medicamento con éxito.',
        );
      })
      .catch(e => Alert.alert('Error', e.message));
  }
  componentWillMount() {
    this.getMedicines();
  }
  handleRefresh = () => {
    this.setState(
      {
        refreshing: true,
      },
      () => {
        this.getMedicines();
      },
    );
  };
  render() {
    this.getMedicines();
    const {medicines, refreshing} = this.state;
    return (
      <Container>
        <View style={styles.mainStyle}>
          {medicines.length > 0 ? (
            <FlatList
              data={medicines}
              renderItem={({item}) => (
                <Card>
                  <CardItem header>
                    <Body>
                      <Title>{item.name}</Title>
                      <Subheading>Vía de administración:</Subheading>
                      <Text>{item.administration_route}</Text>
                    </Body>
                    <Right>
                      <IconButton
                        icon="pencil"
                        size={20}
                        onPress={() =>
                          this.props.navigation.push('EditMedicine', {
                            id: item.id,
                            name: item.name,
                            administration_route: item.administration_route,
                          })
                        }
                      />
                      <IconButton
                        icon="trash-can-outline"
                        color="red"
                        size={20}
                        onPress={() =>
                          Alert.alert(
                            'Eliminar Medicamento',
                            'Está por eliminar el medicamento ' +
                              item.name +
                              ', con id#' +
                              item.id +
                              '.\n¿Desea Continuar?',
                            [
                              {
                                text: 'Cancelar',
                                style: 'cancel',
                              },
                              {
                                text: 'Eliminar',
                                onPress: () =>
                                  this.deleteMedicine(
                                    item.id,
                                    medicines.indexOf(item),
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
                No hay registros de medicamentos
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
