import React, {Component} from 'react';
import {View, FlatList, Alert, StyleSheet} from 'react-native';
import {Container, Card, CardItem, Text, Body, Right} from 'native-base';
import data from '../../JSON/prescriptions.json';
import ExpandibleList from './src/../ExpandibleList';
export default class PatientPrescriptionList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Container>
        {data.map(item => (
          <ExpandibleList
            name={'Dr. ' + item.name}
            displayCard={false}
            medicine={item.medicine}
            indications={item.indications}
          />
        ))}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  texto: {
    textAlign: 'center',
    alignSelf: 'center',
  },
  textView: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#E5EDFF',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
  },
  container: {
    margin: 10,
    marginBottom: 3,
  },
});
