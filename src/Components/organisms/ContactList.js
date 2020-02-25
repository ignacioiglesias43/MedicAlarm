import React, {Component} from 'react';
import {Container, Card, CardItem, Body, Right} from 'native-base';
import {Title, IconButton, Subheading} from 'react-native-paper';
import {FlatList, View, Alert} from 'react-native';
import data from '../../JSON/trustedContacts.json';
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
              <Card>
                <CardItem>
                  <Body>
                    <Title>{item.name}</Title>
                    <Subheading>Número de teléfono: {item.phone}</Subheading>
                    <Subheading>Correo:</Subheading>
                    <Subheading>{item.mail}</Subheading>
                  </Body>
                  <Right>
                    <IconButton
                      icon="pencil"
                      onPress={() =>
                        this.props.navigation.push('EditContact', {
                          name: item.name,
                          phone: item.phone,
                          mail: item.mail,
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
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </Container>
    );
  }
}
