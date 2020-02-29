import React, {Component} from 'react';
import {Container, Card, CardItem, Body, Right} from 'native-base';
import {Title, IconButton, Subheading} from 'react-native-paper';
import {FlatList, View, Alert} from 'react-native';
import data from '../../JSON/trustedContacts.json';
import {ScrollView} from 'react-native-gesture-handler';
export default class ContactList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let filteredContacts = data.filter(contact => {
      return contact.name.indexOf(this.props.query) !== -1;
    });
    return (
      <Container>
        <ScrollView style={{flex: 1, flexDirection: 'column'}}>
          {filteredContacts.map(item => (
            <Card key={item.id}>
              <CardItem>
                <Body>
                  <Title>{item.name}</Title>
                  <Subheading>Número de teléfono: {item.phone}</Subheading>
                </Body>
                <Right>
                  <IconButton
                    icon="pencil"
                    onPress={() =>
                      this.props.navigation.push('EditContact', {
                        name: item.name,
                        phone: item.phone,
                      })
                    }
                  />
                  <IconButton
                    icon="trash-can-outline"
                    color="red"
                    onPress={() =>
                      Alert.alert(
                        'Eliminar Contacto',
                        'Está por eliminar a su contacto ' +
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
              </CardItem>
            </Card>
          ))}
        </ScrollView>
      </Container>
    );
  }
}
