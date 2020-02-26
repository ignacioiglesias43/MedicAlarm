/**
 * Autor: Ignacio Iglesias Campoy
 * Fecha: 21-02-2020
 * Descripcion: Componente que muestra la lista de los pacientes
 */
import React, {Component} from 'react';
import {
  Container,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
} from 'native-base';
import {IconButton} from 'react-native-paper';
import {View, ScrollView} from 'react-native';
import data from '../../JSON/patients.json';

export default class AddPatientsList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let filteredContacts = data.filter(contact => {
      return contact.name.indexOf(this.props.query) !== -1;
    });
    return (
      <Container>
        <ScrollView>
          {filteredContacts.map(item => (
            <List style={{paddingTop: 20}} key={item.id}>
              <ListItem icon>
                <Body>
                  <Text>{item.name}</Text>
                </Body>
                <Right>
                  <IconButton
                    icon="plus-circle"
                    color="#afc9ff"
                    onPress={() => console.log('Pressed')}
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
