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
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <Card>
                <CardItem header>
                  <Body>
                    <Title>{item.name}</Title>
                    <Text>{item.prescription}</Text>
                  </Body>
                  <Right>
                    <IconButton
                      icon="pencil"
                      size={20}
                      onPress={() => this.props.navigation.push('EditReceta')}
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
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </Container>
    );
  }
}
