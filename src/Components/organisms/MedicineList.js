import React, {Component} from 'react';
import {Container, Card, CardItem, Text, Body, Right} from 'native-base';
import {View, FlatList, Alert} from 'react-native';
import {IconButton, Title, Subheading} from 'react-native-paper';
import data from '../../JSON/medicines.json';
export default class MedicineList extends Component {
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
