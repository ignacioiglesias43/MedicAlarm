import React, {Component} from 'react';
import {Container, Card, CardItem, Body, Right, Text} from 'native-base';
import {Title, Subheading} from 'react-native-paper';
import {FlatList, View, ProgressBarAndroid, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';
export default class AlarmTrackingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.data,
      alarms: [],
      refreshing: false,
    };
  }
  getAlarms() {
    const {user} = this.state;
    firestore()
      .collection('alarms')
      .where('patient.data.email', '==', user.data.email)
      .where('monitoring', '==', true)
      .get()
      .then(data => {
        let dataBase = [];
        data.forEach(d => {
          let dx = Object.assign(d.data(), {id: d.id});
          dataBase.push(dx);
        });
        this.setState({alarms: dataBase, refreshing: false});
      })
      .catch(e => console.log(e));
  }
  componentWillMount() {
    this.getAlarms();
  }
  handleRefresh = () => {
    this.setState(
      {
        refreshing: true,
      },
      () => {
        this.getAlarms();
      },
    );
  };
  render() {
    this.getAlarms();
    const {alarms, refreshing} = this.state;
    return (
      <Container>
        {alarms.length > 0 ? (
          <FlatList
            data={alarms}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <Card>
                <CardItem>
                  <Body>
                    <Title>{item.subject}</Title>
                    <Subheading>Días por consumir: {item.remaining}</Subheading>
                    <ProgressBarAndroid
                      styleAttr="Horizontal"
                      indeterminate={false}
                      progress={0.5}
                    />
                  </Body>
                </CardItem>
              </Card>
            )}
            refreshing={refreshing}
            onRefresh={this.handleRefresh}
            keyExtractor={item => item.id}
          />
        ) : (
          <View style={styles.noRegisterView}>
            <Text style={styles.noRegisterViewText}>
              No hay alarmas en seguimiento
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
