import React, {Component} from 'react';
import {Container, Card, CardItem, Text, Body, Right} from 'native-base';
import {View, FlatList, Alert, StyleSheet} from 'react-native';
import ExpandibleList from './src/../ExpandibleList';
import firestore from '@react-native-firebase/firestore';
export default class PatientPrescriptionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prescriptions: [],
      user: props.data,
      refreshing: false,
    };
  }
  getPrescriptions() {
    firestore()
      .collection('prescriptions')
      .where('patient.data.email', '==', this.state.user.data.email)
      .get()
      .then(data => {
        let dataBase = [];
        data.forEach(d => {
          dataBase.push({
            data: d.data(),
            id: d.id,
          });
        });
        this.setState({prescriptions: dataBase, refreshing: false});
      })
      .catch(e => {
        console.log(e);
      });
  }
  handleRefresh = () => {
    this.setState(
      {
        refreshing: true,
      },
      () => {
        this.getPrescriptions();
      },
    );
  };
  componentWillMount() {
    this.getPrescriptions();
  }
  render() {
    this.getPrescriptions();
    const {prescriptions, refreshing} = this.state;
    return (
      <Container>
        {prescriptions.length > 0 ? (
          <FlatList
            data={prescriptions}
            renderItem={({item}) => (
              <ExpandibleList
                name={'Dr. ' + item.data.doctor.data.name}
                displayCard={false}
                medicines={item.data.medicines}
              />
            )}
            refreshing={refreshing}
            onRefresh={this.handleRefresh}
            keyExtractor={item => item.id}
          />
        ) : (
          <View style={styles.noRegisterView}>
            <Text style={styles.noRegisterViewText}>
              No hay registros de recetas
            </Text>
          </View>
        )}
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  mainStyle: {flex: 1, flexDirection: 'column'},
  noRegisterView: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: 250,
  },
  noRegisterViewText: {color: 'gray', fontStyle: 'italic', fontSize: 20},
});
