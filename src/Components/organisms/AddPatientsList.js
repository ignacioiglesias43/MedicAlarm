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

export default class AddPatientsList extends Component {
  render() {
    return (
      <Container>
        <Content>
          <List style={{paddingTop: 20}}>
            <ListItem icon>
              <Body>
                <Text>Walter White</Text>
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
        </Content>
      </Container>
    );
  }
}
