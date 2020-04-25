import * as React from 'react';
import {DataTable} from 'react-native-paper';
import {FlatList} from 'react-native';
import firestore from '@react-native-firebase/firestore';
export default class MedicalAppointment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: [],
      refreshing: false,
    };
  }
  componentWillMount() {
    this.getAppointments();
  }
  getAppointments() {
    firestore()
      .collection('appointments')
      .where('doctor.email', '==', this.props.doctor.email)
      .get()
      .then(data => {
        let dataBase = [];
        data.forEach(d => {
          let dx = Object.assign(d.data(), {id: d.id});
          Object.assign(dx, {
            time: new Date(dx.date._seconds * 1000).toLocaleTimeString(),
          });
          dx.date = new Date(dx.date._seconds * 1000).toLocaleDateString();
          dataBase.push(dx);
        });
        this.setState({appointments: dataBase, refreshing: false});
      })
      .catch(e => console.log(e));
  }
  handleRefresh = () => {
    this.setState(
      {
        refreshing: true,
      },
      () => {
        this.getAppointments();
      },
    );
  };
  render() {
    this.getAppointments();
    const {refreshing, appointments} = this.state;
    return (
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Paciente</DataTable.Title>
          <DataTable.Title numeric>Fecha</DataTable.Title>
          <DataTable.Title numeric>Hora</DataTable.Title>
        </DataTable.Header>
        <FlatList
          data={appointments}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <DataTable.Row onPress={() => console.log('Pressed')}>
              <DataTable.Cell>{item.patient.name}</DataTable.Cell>
              <DataTable.Cell numeric>{item.date}</DataTable.Cell>
              <DataTable.Cell numeric>{item.time.substr(0, 5)}</DataTable.Cell>
            </DataTable.Row>
          )}
          refreshing={refreshing}
          onRefresh={this.handleRefresh}
          keyExtractor={item => item.id}
        />
      </DataTable>
    );
  }
}
