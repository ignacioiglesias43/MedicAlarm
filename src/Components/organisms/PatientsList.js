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
import {View, FlatList, Alert} from 'react-native';
import {IconButton} from 'react-native-paper';
import data from '../../JSON/patientsAdded.json';
export default class PatientsList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <View style={{flex: 1, flexDirection: 'column'}}>
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
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
                    <Text>{item.name}</Text>
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
                            '.\n¿Desea Continuar?',
                          [
                            {
                              text: 'Cancelar',
                              style: 'cancel',
                            },
                            {
                              text: 'Eliminar',
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
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </Container>
    );
  }
}
