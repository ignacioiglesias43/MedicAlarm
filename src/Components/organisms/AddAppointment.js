import React, {Component} from 'react';
import {View, Text, Alert} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Picker, Content, Form, Item, Container, Icon} from 'native-base';
import {ActivityIndicator, Button} from 'react-native-paper';
import AppHeader from '../../Components/organisms/Header';
import firestore, {firebase} from '@react-native-firebase/firestore';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default class AddAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patient: '',
      patientId: '',
      patients: [{name: 'Cargando... '}],
      sendForm: false,
      isDateVisible: false,
      isHourVisible: false,
      chosenDate: new Date(),
      chosenHour: new Date(),
      dateText: 'Seleccione la fecha',
      hourText: 'Seleccione la hora',
    };
  }
  handleDatePicker = newDate => {
    this.setState({
      isDateVisible: !this.state.isDateVisible,
      chosenDate: newDate,
      dateText: newDate.toLocaleDateString(),
    });
  };
  handleHourPicker = newDate => {
    this.setState({
      isHourVisible: !this.state.isHourVisible,
      chosenHour: newDate,
      hourText: newDate.toLocaleTimeString(),
    });
  };
  showDatePicker = () => {
    this.setState({
      isDateVisible: true,
    });
  };
  showHourPicker = () => {
    this.setState({
      isHourVisible: true,
    });
  };
  hideDatePicker = () => {
    this.setState({
      isDateVisible: false,
    });
  };
  hideHourPicker = () => {
    this.setState({
      isHourVisible: true,
    });
  };
  sendPrescription() {
    const {
      sendForm,
      dateText,
      chosenHour,
      patientId,
      patients,
      hourText,
    } = this.state;
    if (
      patientId > 0 &&
      dateText !== 'Seleccione la fecha' &&
      hourText !== 'Seleccione la hora'
    ) {
      this.setState({sendForm: !sendForm});
      setTimeout(() => {
        this.setState({sendForm: !sendForm});
        let newDate = new Date(dateText);
        newDate.setHours(chosenHour.getHours());
        newDate.setMinutes(chosenHour.getMinutes());
        newDate.setSeconds(chosenHour.getSeconds());
        firestore()
          .collection('appointments')
          .add({
            date: firebase.firestore.Timestamp.fromDate(newDate),
            doctor: this.props.route.params.data.data,
            patient: patients[patientId - 1],
          })
          .then(() => {
            this.setState({sendForm: !sendForm});
            this.props.navigation.goBack();
          })
          .catch(e => {
            Alert.alert('Error', e.message);
          });
      }, 1000);
    } else {
      Alert.alert('Advertencia', 'Todos los campos son necesarios.');
    }
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
        this.setState({patients: dataBase});
      })
      .catch(e => {
        console.log(e);
      });
  }
  componentWillMount() {
    this.getContacts();
  }
  render() {
    const {
      sendForm,
      patients,
      patient,
      dateText,
      hourText,
      isDateVisible,
      isHourVisible,
    } = this.state;
    return (
      <Container>
        <AppHeader
          title="Agregar Cita"
          navigation={this.props.navigation}
          icon="arrow-left"
        />
        <Content padder>
          <Form>
            <View>
              <Item picker>
                <Picker
                  style={{width: undefined}}
                  mode={'dropdown'}
                  iosIcon={<Icon name="arrow-down" />}
                  placeholder="Seleccione un paciente"
                  placeholderStyle={{color: '#bfc6ea'}}
                  placeholderIconColor="#007aff"
                  selectedValue={patient}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({patient: itemValue, patientId: itemIndex})
                  }>
                  <Picker.Item
                    label={'Seleccione un paciente:'}
                    value={'Seleccione un paciente:'}
                    key={0}
                  />
                  {patients.map(item => (
                    <Picker.Item
                      label={item.name}
                      value={item.name}
                      key={item.name}
                    />
                  ))}
                </Picker>
              </Item>
            </View>
            <View>
              <Item picker style={{padding: 10}}>
                <TouchableOpacity onPress={this.showDatePicker}>
                  <Text style={{color: 'green'}}>{dateText}</Text>
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={isDateVisible}
                  mode="date"
                  onConfirm={this.handleDatePicker}
                  onCancel={this.hideDatePicker}
                />
              </Item>
            </View>
            <View>
              <Item picker style={{padding: 10}}>
                <TouchableOpacity onPress={this.showHourPicker}>
                  <Text style={{color: 'green'}}>{hourText.replace()}</Text>
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={isHourVisible}
                  mode="time"
                  onConfirm={this.handleHourPicker}
                  onCancel={this.hideHourPicker}
                />
              </Item>
            </View>
          </Form>
          <View style={{paddingTop: 15}}>
            <Button
              color="#FF7058"
              mode="contained"
              dark={true}
              onPress={() => this.sendPrescription()}>
              Guardar
            </Button>
          </View>
          <ActivityIndicator
            animating={sendForm}
            color="#FF7058"
            size="large"
            style={{paddingTop: 15}}
          />
        </Content>
      </Container>
    );
  }
}
