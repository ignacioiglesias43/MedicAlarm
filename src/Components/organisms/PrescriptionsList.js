import React, {Component} from 'react';
import {Container, Card, CardItem, Text, Body, Right} from 'native-base';
import {View, FlatList} from 'react-native';
import {IconButton, Title} from 'react-native-paper';
import data from '../../JSON/prescriptions.json';
export default class PrescriptionsList extends Component {
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
                      onPress={() => console.log('Pressed')}
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
