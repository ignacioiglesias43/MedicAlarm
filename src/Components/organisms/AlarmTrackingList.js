import React, {Component} from 'react';
import {Container, Card, CardItem, Body, Right, Text} from 'native-base';
import {Title, Subheading, ProgressBar} from 'react-native-paper';
import {FlatList, View, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';
export default class AlarmTrackingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.data,
      alarms: [],
      colors: [],
      refreshing: false,
    };
  }
  setColors(alarms) {
    let colorsDB = this.state.colors;
    alarms.forEach(alarm => {
      const progress = alarm.cont_shots / alarm.total_shots;
      if (progress === 0) {
        colorsDB.push('red');
      } else if (progress > 0 && progress <= alarm.total_shots / 2) {
        colorsDB.push('gold');
      } else {
        colorsDB.push('green');
      }
      this.setState({
        colors: colorsDB,
      });
    });
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
        this.setColors(dataBase);
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
    const {alarms, refreshing, colors} = this.state;
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
                    <Subheading>
                      Total de veces consumido: {item.cont_shots}
                    </Subheading>
                    <Subheading>
                      Total a consumir: {item.total_shots}
                    </Subheading>
                  </Body>
                </CardItem>
                <ProgressBar
                  indeterminate={false}
                  progress={item.cont_shots / item.total_shots}
                  color={colors[alarms.indexOf(item)]}
                />
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
