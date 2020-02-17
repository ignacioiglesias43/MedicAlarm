import * as React from 'react';
import {DataTable} from 'react-native-paper';

export default class MyComponent extends React.Component {
  render() {
    return (
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Paciente</DataTable.Title>
          <DataTable.Title numeric>Fecha</DataTable.Title>
          <DataTable.Title numeric>Hora</DataTable.Title>
        </DataTable.Header>

        <DataTable.Row onPress={() => console.log('Pressed')}>
          <DataTable.Cell>Franco Escamilla</DataTable.Cell>
          <DataTable.Cell numeric>16-02-2020</DataTable.Cell>
          <DataTable.Cell numeric>15:30</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row onPress={() => console.log('Pressed')}>
          <DataTable.Cell>Walter White</DataTable.Cell>
          <DataTable.Cell numeric>16-02-2020</DataTable.Cell>
          <DataTable.Cell numeric>18:00</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row onPress={() => console.log('Pressed')}>
          <DataTable.Cell>Esmeralda Rubín</DataTable.Cell>
          <DataTable.Cell numeric>16-02-2020</DataTable.Cell>
          <DataTable.Cell numeric>20:00</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row onPress={() => console.log('Pressed')}>
          <DataTable.Cell>Darien Ramírez</DataTable.Cell>
          <DataTable.Cell numeric>17-02-2020</DataTable.Cell>
          <DataTable.Cell numeric>12:30</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row onPress={() => console.log('Pressed')}>
          <DataTable.Cell>Ignacio Iglesias</DataTable.Cell>
          <DataTable.Cell numeric>17-02-2020</DataTable.Cell>
          <DataTable.Cell numeric>18:30</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Pagination
          page={1}
          numberOfPages={3}
          onPageChange={page => {
            console.log(page);
          }}
          label="1-2 of 6"
        />
      </DataTable>
    );
  }
}
