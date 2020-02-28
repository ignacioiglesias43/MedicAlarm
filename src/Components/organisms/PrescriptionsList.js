import React, {Component} from 'react';
import {Container, Card, CardItem, Text, Body, Right} from 'native-base';
import {View, FlatList, Alert} from 'react-native';
import {IconButton, Title} from 'react-native-paper';
import data from '../../JSON/prescriptions.json';
export default class PrescriptionsList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <View style={{flex: 1, flexDirection: 'column'}}>
          {data.map(item => (
            <Card key={item.id}>
              <CardItem header>
                <Body>
                  <Title>{item.name}</Title>
                  <Text>{item.medicine}</Text>
                  <Text>{item.indications}</Text>
                </Body>
                <Right>
                  <IconButton
                    icon="pencil"
                    size={20}
                    onPress={() =>
                      this.props.navigation.push('EditReceta', {
                        id: item.medicine_id,
                        name: item.medicine,
                        indications: item.indications,
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
        </View>
      </Container>
    );
  }
}
