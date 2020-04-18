import React, {Component, Fragment} from 'react';
import {View, StyleSheet, Text, Alert} from 'react-native';
import {Content, Container, Textarea} from 'native-base';
import {ActivityIndicator, Button} from 'react-native-paper';
import AppHeader from '../../Components/organisms/Header';
import SearchableDropdown from 'react-native-searchable-dropdown';
import firestore from '@react-native-firebase/firestore';
export default class AddPrescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sendForm: false,
      selectedPatient: [],
      selectedMedicines: [],
      contacts: [],
      medicines: [],
      indications: [],
    };
  }
  getContacts() {
    firestore()
      .collection('patient-doctor')
      .where('doctor.id', '==', this.props.route.params.data.id)
      .get()
      .then(data => {
        let dataBase = [];
        data.forEach(d => {
          dataBase.push(d.data().patient);
        });
        this.setState({contacts: dataBase});
      })
      .catch(e => {
        console.log(e);
      });
  }
  getMedicines() {
    firestore()
      .collection('medicines')
      .get()
      .then(data => {
        let dataBase = [];
        data.forEach(d => {
          let dx = Object.assign(d.data(), {id: d.id});
          dataBase.push(dx);
        });
        this.setState({medicines: dataBase});
      })
      .catch(e => {
        console.log(e);
      });
  }
  sendPrescription() {
    this.setState({sendForm: !this.state.sendForm});
    setTimeout(() => {
      firestore()
        .collection('prescriptions')
        .add({
          doctor: this.props.route.params.data,
          medicines: this.state.selectedMedicines,
          patient: {data: this.state.selectedPatient[0]},
        })
        .then(() => {
          this.setState({sendForm: !this.state.sendForm});
          this.props.navigation.goBack();
        })
        .catch(e => {
          Alert.alert('Error', e.message);
        });
    }, 1000);
  }
  componentWillMount() {
    /**Aquí se muestran los pacientes registrados y las medicinas */
    this.getContacts();
    this.getMedicines();
  }
  render() {
    const {sendForm, contacts, medicines} = this.state;
    return (
      <Container>
        <AppHeader
          title="Agregar Receta"
          navigation={this.props.navigation}
          icon="arrow-left"
        />
        <Content>
          <Fragment>
            <View>
              <SearchableDropdown
                selectedItems={this.state.selectedPatient}
                onItemSelect={item => {
                  const items = this.state.selectedPatient;
                  items.push(item);
                  this.setState({selectedPatient: items});
                }}
                containerStyle={{padding: 5}}
                onRemoveItem={(item, index) => {
                  const items = this.state.selectedPatient.filter(
                    sitem => sitem.id !== item.id,
                  );
                  this.setState({selectedPatient: items});
                }}
                itemStyle={styles.itemStyle}
                itemTextStyle={{color: '#222'}}
                itemsContainerStyle={{maxHeight: 140}}
                items={contacts}
                resetValue={false}
                textInputProps={{
                  placeholder: 'Seleccione un paciente',
                  underlineColorAndroid: 'transparent',
                  style: {
                    padding: 12,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 5,
                  },
                  onTextChange: text => console.log(text),
                }}
                listProps={{
                  nestedScrollEnabled: true,
                }}
              />
            </View>
            <View>
              <SearchableDropdown
                multi={true}
                selectedItems={this.state.selectedMedicines}
                onItemSelect={item => {
                  const items = this.state.selectedMedicines;
                  items.push(item);
                  this.setState({selectedMedicines: items});
                }}
                containerStyle={{padding: 5}}
                onRemoveItem={(item, index) => {
                  const items = this.state.selectedMedicines.filter(
                    sitem => sitem.id !== item.id,
                  );
                  this.setState({selectedMedicines: items});
                }}
                itemStyle={styles.itemStyle}
                itemTextStyle={{color: '#222'}}
                itemsContainerStyle={{maxHeight: 140}}
                items={medicines}
                chip={true}
                resetValue={false}
                textInputProps={{
                  placeholder: 'Seleccione uno o más medicamentos',
                  underlineColorAndroid: 'transparent',
                  style: {
                    padding: 12,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 5,
                  },
                }}
                listProps={{
                  nestedScrollEnabled: true,
                }}
              />
            </View>
            {this.state.selectedMedicines.map(item => (
              <View style={{padding: 5}} key={item.id}>
                <Text>{item.name}</Text>
                <Textarea
                  style={{
                    padding: 12,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 5,
                    width: '100%',
                  }}
                  rowSpan={5}
                  bordered
                  placeholder="Indicaciones"
                  placeholderTextColor="#cc"
                  onChangeText={text => {
                    let indications = {indications: text.trim()};
                    Object.assign(
                      this.state.selectedMedicines[
                        this.state.selectedMedicines.indexOf(item)
                      ],
                      indications,
                    );
                  }}
                />
              </View>
            ))}
            <View style={{paddingTop: 15, paddingLeft: 5, paddingRight: 5}}>
              <Button
                color="#FF7058"
                mode="contained"
                dark={true}
                onPress={() => {
                  let done = false;
                  this.state.selectedMedicines.forEach(med => {
                    med.indications
                      ? med.indications.length > 0
                        ? (done = true)
                        : (done = false)
                      : (done = false);
                  });
                  if (
                    done &&
                    this.state.selectedPatient.length > 0 &&
                    this.state.selectedMedicines.length > 0
                  ) {
                    this.sendPrescription();
                  } else {
                    Alert.alert('Error', 'Todos los campos son necesarios.');
                  }
                }}>
                Enviar
              </Button>
            </View>
            <ActivityIndicator
              animating={sendForm}
              color="#FF7058"
              size="large"
              style={{paddingTop: 15}}
            />
          </Fragment>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  itemStyle: {
    padding: 10,
    marginTop: 2,
    backgroundColor: '#ddd',
    borderColor: '#bbb',
    borderWidth: 1,
    borderRadius: 5,
  },
});
