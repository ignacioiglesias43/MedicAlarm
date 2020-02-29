import React, {Component} from 'react';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Body,
  Text,
  Right,
} from 'native-base';
import data from '../../JSON/alarms.json';
import {Title, IconButton, Subheading} from 'react-native-paper';
import {FlatList, View, Alert} from 'react-native';
export default class AlarmList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Container>
        <View style={{flex: 1}}>
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <Card>
                <CardItem>
                  <Body>
                    <Title>{item.subject}</Title>
                    <Subheading>Siguiente hora: {item.hour}</Subheading>
                    <Subheading>Frecuencia: {item.frequency}hrs</Subheading>
                    <Subheading>
                      Avisar a: {item.trusted_contact.name}
                    </Subheading>
                  </Body>
                  <Right>
                    <IconButton
                      icon="pencil"
                      onPress={() =>
                        this.props.navigation.push('EditAlarm', {
                          id: item.id,
                          subject: item.subject,
                          hour: item.hour,
                          frequency: item.frequency,
                          trusted_contact: item.trusted_contact,
                        })
                      }
                    />
                    <IconButton
                      icon="trash-can-outline"
                      color="red"
                      onPress={() =>
                        Alert.alert(
                          'Eliminar Alarma',
                          'Está por eliminar la alarma ' +
                            item.subject +
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
