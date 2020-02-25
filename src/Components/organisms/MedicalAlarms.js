import React, {Component} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {
  Container,
  Form,
  Item,
  Input,
  Content,
  List,
  ListItem,
  Body,
  Right,
  Icon,
  Left,
} from 'native-base';
import {FlatList} from 'react-native';
import data from '../../JSON/alarms.json';
import {DataTable} from 'react-native-paper';

export default class MedicalAlarms extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Asunto</DataTable.Title>
            <DataTable.Title>Hora</DataTable.Title>
            <DataTable.Title>Frecuencia</DataTable.Title>
          </DataTable.Header>
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <DataTable.Row onPress={() => console.log('Pressed')}>
                <DataTable.Cell>{item.subject}</DataTable.Cell>
                <DataTable.Cell>{item.hour}</DataTable.Cell>
                <DataTable.Cell>{item.frequency} hrs</DataTable.Cell>
              </DataTable.Row>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </DataTable>
      </View>
    );
  }
}
