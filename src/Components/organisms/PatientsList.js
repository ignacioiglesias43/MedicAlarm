/**
 * Autor: Ignacio Iglesias Campoy
 * Fecha: 21-02-2020
 * Descripcion: Componente que muestra la lista de los pacientes
 */
import React, {Component} from 'react';
import {
  Container,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
} from 'native-base';
import {Alert, FlatList, View, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {IconButton} from 'react-native-paper';
export default class PatientsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      id: [],
      refreshing: false,
    };
  }
  componentWillMount() {
    /**Aquí se muestran los pacientes registrados */
    this.getContacts();
  }
  getContacts() {
    firestore()
      .collection('patient-doctor')
      .where('doctor.id', '==', this.props.data.id)
      .get()
      .then(data => {
        let dataBase = [];
        let id = [];
        data.forEach(d => {
          dataBase.push(d.data().patient);
          id.push(d.id);
        });
        this.setState({contacts: dataBase, id: id, refreshing: false});
      })
      .catch(e => {
        console.log(e);
      });
  }
  deleteContact(id, index) {
    firestore()
      .collection('patient-doctor')
      .doc(id)
      .delete()
      .then(() => {
        let newData = this.state.contacts;
        let newID = this.state.id;
        newData.splice(index, 1);
        newID.splice(index, 1);
        this.setState({
          contacts: newData,
          id: newID,
        });
        Alert.alert(
          'Contacto eliminado',
          'Ha eliminado a su contacto con éxito.',
        );
      })
      .catch(e => Alert.alert('Error', e.message));
  }
  handleRefresh = () => {
    this.setState(
      {
        refreshing: true,
      },
      () => {
        this.getContacts();
      },
    );
  };
  render() {
    this.getContacts();
    const {contacts, id, refreshing} = this.state;
    let filteredContacts = contacts.filter(contact => {
      return contact.name.indexOf(this.props.query) !== -1;
    });
    return (
      <Container>
        {filteredContacts.length > 0 ? (
          <FlatList
            data={filteredContacts}
            renderItem={({item}) => (
              <List style={{padding: 20}}>
                <ListItem thumbnail icon>
                  <Left>
                    <Thumbnail
                      square
                      source={require('../../img/usuario.png')}
                    />
                  </Left>
                  <Body>
                    <Text>{`${item.name} ${item.last_name}`}</Text>
                  </Body>
                  <Right>
                    <IconButton
                      icon="trash-can-outline"
                      color="red"
                      onPress={() =>
                        Alert.alert(
                          'Eliminar Paciente',
                          'Está por eliminar de su lista de contactos al paciente ' +
                            item.name +
                            ' ' +
                            item.last_name +
                            '.\n¿Desea Continuar?',
                          [
                            {
                              text: 'Cancelar',
                              style: 'cancel',
                            },
                            {
                              text: 'Eliminar',
                              onPress: () =>
                                this.deleteContact(
                                  id[contacts.indexOf(item)],
                                  contacts.indexOf(item),
                                ),
                            },
                          ],
                          {cancelable: false},
                        )
                      }
                    />
                  </Right>
                </ListItem>
              </List>
            )}
            refreshing={refreshing}
            onRefresh={this.handleRefresh}
            keyExtractor={item => item.email}
          />
        ) : (
          <View style={styles.noRegisterView}>
            <Text style={styles.noRegisterViewText}>
              No hay registros de contactos
            </Text>
          </View>
        )}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  noRegisterView: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: 250,
  },
  noRegisterViewText: {color: 'gray', fontStyle: 'italic', fontSize: 20},
});
