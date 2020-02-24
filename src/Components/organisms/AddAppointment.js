import React, {Component, useState} from 'react';
import {View, Platform, Text} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {
  Picker,
  Content,
  Form,
  Item,
  Container,
  Icon,
  Textarea,
  DatePicker,
} from 'native-base';
import {ActivityIndicator, Button} from 'react-native-paper';
import AppHeader from '../../Components/organisms/Header';
import data from '../../JSON/patientsAdded.json';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default class AddAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patient: '',
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
      isDateVisible: false,
      chosenDate: newDate,
      dateText: newDate.toString().substr(4, 12),
    });
  };
  handleHourPicker = newDate => {
    this.setState({
      isHourVisible: false,
      chosenHour: newDate,
      hourText: newDate.toString().substr(16, 5),
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
    this.setState({sendForm: !this.state.sendForm});
    setTimeout(() => {
      this.setState({sendForm: !this.state.sendForm});
      this.props.navigation.goBack();
    }, 1000);
  }

  render() {
    const {sendForm} = this.state;
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
              <View>
                <Text>Seleccione un paciente:</Text>
              </View>
              <Item picker>
                <Picker
                  style={{width: undefined}}
                  iosIcon={<Icon name="arrow-down" />}
                  placeholder="Seleccione un paciente"
                  placeholderStyle={{color: '#bfc6ea'}}
                  placeholderIconColor="#007aff"
                  selectedValue={this.state.patient}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({patient: itemValue})
                  }>
                  {data.map(item => (
                    <Picker.Item
                      label={item.name}
                      value={item.id}
                      key={item.id}
                    />
                  ))}
                </Picker>
              </Item>
            </View>
            <View>
              <Item picker style={{padding: 10}}>
                <TouchableOpacity onPress={this.showDatePicker}>
                  <Text style={{color: 'green'}}>{this.state.dateText}</Text>
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={this.state.isDateVisible}
                  mode="date"
                  onConfirm={this.handleDatePicker}
                  onCancel={this.hideDatePicker}
                />
              </Item>
            </View>
            <View>
              <Item picker style={{padding: 10}}>
                <TouchableOpacity onPress={this.showHourPicker}>
                  <Text style={{color: 'green'}}>{this.state.hourText}</Text>
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
