import React, {Component} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {FlatList} from 'react-native';
import {DataTable} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
export default class MedicalAlarms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.data,
      alarms: [],
    };
  }
  getAlarms() {
    const {user} = this.state;
    firestore()
      .collection('alarms')
      .where('patient.data.email', '==', user.email)
      .get()
      .then(data => {
        let dataBase = [];
        data.forEach(d => {
          let dx = Object.assign(d.data(), {id: d.id});
          dataBase.push(dx);
        });
        this.setState({alarms: dataBase});
      })
      .catch(e => console.log(e));
  }
  componentWillMount() {
    this.getAlarms();
  }
  render() {
    this.getAlarms();
    const {alarms} = this.state;
    return (
      <View style={{flex: 1}}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Asunto</DataTable.Title>
            <DataTable.Title>Hora</DataTable.Title>
            <DataTable.Title>Frecuencia</DataTable.Title>
          </DataTable.Header>
          <FlatList
            data={alarms}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <DataTable.Row onPress={() => console.log('Pressed')}>
                <DataTable.Cell>{item.subject}</DataTable.Cell>
                <DataTable.Cell>{item.next_hour}</DataTable.Cell>
                <DataTable.Cell>{item.frequency} hrs</DataTable.Cell>
              </DataTable.Row>
            )}
            keyExtractor={item => item.id}
          />
        </DataTable>
      </View>
    );
  }
}
