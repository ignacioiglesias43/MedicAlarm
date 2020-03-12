import React, {Component} from 'react';
import {Container, Card, CardItem, Text, Body, Right} from 'native-base';
import {View, FlatList, Alert, StyleSheet} from 'react-native';
import {IconButton, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import data from '../../JSON/prescriptions.json';
import {TouchableOpacity} from 'react-native-gesture-handler';
export default class PrescriptionsList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        {data.map(item => (
          <TouchableOpacity style={styles.textView}>
            <Text style={styles.texto}>Dr. {item.name}</Text>
            <Icon name="chevron-down" size={30} style={styles.texto} />
          </TouchableOpacity>
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
    margin: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#E5EDFF',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
  },
});
