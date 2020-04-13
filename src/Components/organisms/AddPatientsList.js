/**
 * Autor: Ignacio Iglesias Campoy
 * Fecha: 21-02-2020
 * Descripcion: Componente que muestra la lista de los pacientes
 */
import React, {Component} from 'react';
import {Container, List, ListItem, Body, Right, Text} from 'native-base';
import {IconButton} from 'react-native-paper';
import {ScrollView, Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default class AddPatientsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.data.id,
      contacts: [],
    };
  }
  componentWillMount() {
    /**Aquí se muestran los pacientes registrados */
    firestore()
      .collection('users')
      .where('type', '==', 'patient')
      .get()
      .then(data => {
        let dataBase = [];
        data.forEach(d => {
          dataBase.push(d.data());
        });
        this.setState({contacts: dataBase});
      })
      .catch(e => {
        console.log(e);
      });
  }
  addPatient(index, patient) {
    /**Se agregan pacientes */
    firestore()
      .collection('patient-doctor')
      .add({
        doctor: this.props.data.data,
        patient: this.state.contacts[index],
      })
      .then(() => {
        Alert.alert(
          'Añadió un paciente',
          `Usted ha añadido con éxito al paciente ${patient.name} ${
            patient.last_name
          }`,
        );
      })
      .catch(e => {
        Alert.alert('Error', e.message);
      });
  }
  addPatientDoctor(index, patient) {
    /**Valida que no exista un registro */
    firestore()
      .collection('patient-doctor')
      .where('patient.email', '==', patient.email)
      .get()
      .then(data => {
        if (data.docs.length === 0) {
          this.addPatient(index, patient);
        } else {
          Alert.alert('Error', 'Usted ya tiene agregado a este paciente.');
        }
      })
      .catch(e => {
        Alert.alert('Error', e.message);
      });
  }
  render() {
    const {contacts} = this.state;
    let filteredContacts = contacts.filter(contact => {
      return contact.name.indexOf(this.props.query) !== -1;
    });
    return (
      <Container>
        <ScrollView>
          {filteredContacts.map(item => (
            <List style={{paddingTop: 20}} key={item.email}>
              <ListItem icon>
                <Body>
                  <Text>{`${item.name} ${item.last_name}`}</Text>
                </Body>
                <Right>
                  <IconButton
                    icon="plus-circle"
                    color="#afc9ff"
                    onPress={() =>
                      this.addPatientDoctor(
                        filteredContacts.indexOf(item),
                        item,
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
