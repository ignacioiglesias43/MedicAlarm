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
import {ScrollView, Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {IconButton} from 'react-native-paper';
export default class PatientsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      id: [],
    };
  }
  componentWillMount() {
    /**Aquí se muestran los pacientes registrados */
    console.log(this.props.data.id);
    firestore()
      .collection('patient-doctor')
      .where('doctor.id', '==', this.props.data.id)
      .get()
      .then(data => {
        let dataBase = [];
        let id = [];
        data.forEach(d => {
          console.log(d.data().patient);
          dataBase.push(d.data().patient);
          id.push(d.id);
        });
        this.setState({contacts: dataBase, id: id});
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
  render() {
    const {contacts, id} = this.state;
    let filteredContacts = contacts.filter(contact => {
      return contact.name.indexOf(this.props.query) !== -1;
    });
    return (
      <Container>
        <ScrollView>
          {filteredContacts.map(item => (
            <List style={{padding: 20}} key={item.email}>
              <ListItem thumbnail icon>
                <Left>
                  <Thumbnail square source={require('../../img/usuario.png')} />
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
          ))}
        </ScrollView>
      </Container>
    );
  }
}
