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
import data from '../../JSON/alarmTracking.json';
import {Title, IconButton, Subheading} from 'react-native-paper';
import {FlatList, View, Alert, ProgressBarAndroid} from 'react-native';
export default class AlarmTrackingList extends Component {
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
                    <Subheading>
                      Comenzó a consumir: {item.initial_date}
                    </Subheading>
                    <Subheading>
                      Termina de consumir: {item.last_date}
                    </Subheading>
                    <Subheading>Días por consumir: {item.remaining}</Subheading>
                    <ProgressBarAndroid
                      styleAttr="Horizontal"
                      indeterminate={false}
                      progress={0.5}
                    />
                  </Body>
                  <Right>
                    <IconButton
                      icon="trash-can-outline"
                      color="red"
                      onPress={() =>
                        Alert.alert(
                          'Eliminar Alarma',
                          'Está por eliminar la alarma ' +
                            item.subject +
                            ' de su lista de seguimiento' +
                            '.\n¿Desea Continuar?',
                          [
                            {
                              text: 'Cancelar',
                              style: 'cancel',
                            },
                            {
                              text: 'Eliminar',
                              onPress: () => console.log('Eliminado'),
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
