import React, {Component} from 'react';
import {View, Text, Alert} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Content, Form, Item, Container} from 'native-base';
import {ActivityIndicator, Button} from 'react-native-paper';
import AppHeader from '../../Components/organisms/Header';
import firestore, {firebase} from '@react-native-firebase/firestore';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default class EditAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patient: '',
      sendForm: false,
      isDateVisible: false,
      isHourVisible: false,
      chosenDate: new Date(
        JSON.stringify(this.props.route.params.date).replace(/"/g, ''),
      ),
      chosenHour: new Date(),
      dateText: JSON.stringify(this.props.route.params.date).replace(/"/g, ''),
      hourText: JSON.stringify(this.props.route.params.hour).replace(/"/g, ''),
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
    const {route} = this.props;
    const {sendForm, chosenHour, dateText, hourText} = this.state;
    if (dateText && hourText) {
      this.setState({sendForm: !sendForm});
      setTimeout(() => {
        let newDate = new Date(dateText);
        newDate.setHours(chosenHour.getHours());
        newDate.setMinutes(chosenHour.getMinutes());
        newDate.setSeconds(chosenHour.getSeconds());
        firestore()
          .collection('appointments')
          .doc(route.params.id)
          .update({
            date: firebase.firestore.Timestamp.fromDate(newDate),
            doctor: route.params.doctor,
            patient: route.params.patient,
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
  componentWillMount() {
    this.setState({
      chosenHour: new Date(this.state.hourText),
    });
  }
  render() {
    const {sendForm, chosenDate} = this.state;

    return (
      <Container>
        <AppHeader
          title="Editar Cita"
          navigation={this.props.navigation}
          icon="arrow-left"
        />
        <Content padder>
          <Form>
            <View>
              <Item picker style={{padding: 10}}>
                <TouchableOpacity onPress={this.showDatePicker}>
                  <Text style={{color: 'green'}}>
                    Fecha: {this.state.dateText}
                  </Text>
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={this.state.isDateVisible}
                  date={chosenDate}
                  mode="date"
                  onConfirm={this.handleDatePicker}
                  onCancel={this.hideDatePicker}
                />
              </Item>
            </View>
            <View>
              <Item picker style={{padding: 10}}>
                <TouchableOpacity onPress={this.showHourPicker}>
                  <Text style={{color: 'green'}}>
                    Hora: {this.state.hourText}
                  </Text>
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={this.state.isHourVisible}
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
              Enviar
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
