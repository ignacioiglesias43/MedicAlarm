import * as React from 'react';
import {DataTable} from 'react-native-paper';
import {View, Text, FlatList} from 'react-native';
import data from '../../JSON/appointments.json';

export default class MyComponent extends React.Component {
  render() {
    return (
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Paciente</DataTable.Title>
          <DataTable.Title numeric>Fecha</DataTable.Title>
          <DataTable.Title numeric>Hora</DataTable.Title>
        </DataTable.Header>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <DataTable.Row onPress={() => console.log('Pressed')}>
              <DataTable.Cell>{item.name}</DataTable.Cell>
              <DataTable.Cell numeric>{item.appointment_date}</DataTable.Cell>
              <DataTable.Cell numeric>{item.appointment_hour}</DataTable.Cell>
            </DataTable.Row>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </DataTable>
    );
  }
}
