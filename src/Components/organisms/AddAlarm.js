import React, {Component} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Alert} from 'react-native';
import {Picker, Content, Form, Item, Container} from 'native-base';
import {ActivityIndicator, Button, TextInput, Switch} from 'react-native-paper';
import AppHeader from '../../Components/organisms/Header';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import SearchableDropdown from 'react-native-searchable-dropdown';
import firestore from '@react-native-firebase/firestore';
import PushNotification from 'react-native-push-notification';
import ReactNativeAN from 'react-native-alarm-notification';
export default class AddAlarm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSwitchOn: false,
      user: this.props.route.params.data,
      patient: '',
      subjectText: '',
      sendForm: false,
      isHourVisible: false,
      chosenHour: new Date(),
      frequency: '1',
      hourText: 'Seleccione la hora inicial',
      selectedTrustedContact: {},
      contacts: [],
    };
  }
  getContacts() {
    const {user} = this.state;
    firestore()
      .collection('trusted-contacts')
      .where('patient.email', '==', user.data.email)
      .get()
      .then(data => {
        let dataBase = [];
        data.forEach(d => {
          let dx = Object.assign(d.data(), {id: d.id});
          dataBase.push(dx);
        });
        this.setState({contacts: dataBase});
      })
      .catch(e => console.log(e));
  }
  componentWillMount() {
    this.getContacts();
  }
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
  handleAlarmManager = (subject, date) => {
    const fireDate = ReactNativeAN.parseDate(date);
    const alarmNotifData = {
      alarm_id: '12345',
      title: 'Continuar con su tratamiento',
      message: `Hora de tomar su medicamento ${subject}`,
      sound_name: 'clock',
      channel: 'my_channel_id',
      fire_date: fireDate,
      small_icon: 'ic_launcher',
      data: {foo: 'bar'},
    };
    ReactNativeAN.scheduleAlarm(alarmNotifData);
  };
  pushNotif = (subject, date) => {
    PushNotification.localNotification({
      title: 'Continuar con su tratamiento',
      color: 'red',
      vibration: 300,
      autoCancel: false,
      importance: 'max',
      actions: '["Listo"]',
      message: `Hora de tomar su medicamento ${subject}`,
      soundName: 'clock.mp3',
      date: new Date(Date.now() + 5 * 1000), // in 60 secs
    });
  };
  addAlarm() {
    const {
      selectedTrustedContact,
      user,
      isSwitchOn,
      hourText,
      subjectText,
      frequency,
      chosenHour,
    } = this.state;
    this.setState({sendForm: !this.state.sendForm});
    setTimeout(() => {
      firestore()
        .collection('alarms')
        .add({
          subject: subjectText,
          frequency: frequency,
          monitoring: isSwitchOn,
          next_hour: hourText,
          patient: user,
          trusted_contact: selectedTrustedContact,
        })
        .then(() => {
          this.setState({sendForm: !this.state.sendForm});
          this.pushNotif(subjectText, chosenHour);
          // this.handleAlarmManager(subjectText, chosenHour);
          this.props.navigation.goBack();
        })
        .catch(e => {
          this.setState({sendForm: !this.state.sendForm});
          Alert.alert('Error', e.message);
        });
    }, 1000);
  }
  sendAlarm() {
    const {
      selectedTrustedContact,
      isSwitchOn,
      hourText,
      subjectText,
    } = this.state;
    if (subjectText.length > 0 && hourText !== 'Seleccione la hora inicial') {
      if (isSwitchOn) {
        if (Object.entries(selectedTrustedContact).length > 0) {
          this.addAlarm();
        } else {
          Alert.alert(
            'Advertencia',
            'Si desea monitorear una alarma, debe seleccionar un contacto de confianza.',
          );
        }
      } else {
        this.addAlarm();
      }
    } else {
      Alert.alert(
        'Advertencia',
        'Favor de llenar los campos Asunto y Hora Inicial',
      );
    }
  }
  hideHourPicker = () => {
    this.setState({
      isHourVisible: false,
    });
  };
  render() {
    this.getContacts();
    const {sendForm, isSwitchOn, contacts} = this.state;
    return (
      <Container>
        <AppHeader
          title="Agregar Alarma"
          navigation={this.props.navigation}
          icon="arrow-left"
        />
        <Content padder>
          <Form>
            <TextInput
              label="Asunto"
              value={this.state.subjectText}
              onChangeText={text => this.setState({subjectText: text})}
              returnKeyType={'next'}
              mode="outlined"
              style={{paddingTop: 5}}
            />
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
            <View>
              <Item picker>
                <View
                  style={{
                    padding: 10,
                    display: 'flex',
                    flexDirection: 'column',
                  }}>
                  <Text>Seleccione la frecuencia de su alarma:</Text>
                </View>
                <Picker
                  note
                  mode="dropdown"
                  style={{width: 120}}
                  selectedValue={this.state.frequency}
                  onValueChange={value => {
                    this.setState({frequency: value});
                  }}>
                  <Picker.Item label="1 hora" value="1" />
                  <Picker.Item label="2 horas" value="2" />
                  <Picker.Item label="3 horas" value="3" />
                  <Picker.Item label="4 horas" value="4" />
                  <Picker.Item label="5 horas" value="5" />
                  <Picker.Item label="6 horas" value="6" />
                  <Picker.Item label="7 horas" value="7" />
                  <Picker.Item label="8 horas" value="8" />
                  <Picker.Item label="9 horas" value="9" />
                  <Picker.Item label="10 horas" value="10" />
                  <Picker.Item label="11 horas" value="11" />
                  <Picker.Item label="12 horas" value="12" />
                  <Picker.Item label="13 horas" value="13" />
                  <Picker.Item label="14 horas" value="14" />
                  <Picker.Item label="15 horas" value="15" />
                  <Picker.Item label="16 horas" value="16" />
                  <Picker.Item label="17 horas" value="17" />
                  <Picker.Item label="18 horas" value="18" />
                  <Picker.Item label="19 horas" value="19" />
                  <Picker.Item label="20 horas" value="20" />
                  <Picker.Item label="21 horas" value="21" />
                  <Picker.Item label="22 horas" value="22" />
                  <Picker.Item label="23 horas" value="23" />
                  <Picker.Item label="24 horas" value="24" />
                </Picker>
              </Item>
            </View>
            <View>
              <View style={styles.switchContainer}>
                <Text>Monitorear alarma</Text>
                <Switch
                  value={isSwitchOn}
                  color="#FF7058"
                  onValueChange={() => {
                    this.setState({
                      isSwitchOn: !isSwitchOn,
                      selectedTrustedContact: {},
                    });
                  }}
                />
              </View>
              {isSwitchOn && (
                <SearchableDropdown
                  selectedItems={this.state.selectedTrustedContact}
                  onItemSelect={item => {
                    this.setState({selectedTrustedContact: item});
                  }}
                  containerStyle={{padding: 5}}
                  onRemoveItem={(item, index) => {
                    const items = this.state.selectedTrustedContact.filter(
                      sitem => sitem.id !== item.id,
                    );
                    this.setState({selectedTrustedContact: items});
                  }}
                  itemStyle={styles.itemStyle}
                  itemTextStyle={{color: '#222'}}
                  itemsContainerStyle={{maxHeight: 140}}
                  items={contacts}
                  resetValue={false}
                  textInputProps={{
                    placeholder: 'Seleccione un contacto de emergencia',
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
              )}
            </View>
          </Form>
          <View style={{paddingTop: 15}}>
            <Button
              color="#FF7058"
              mode="contained"
              dark={true}
              onPress={() => this.sendAlarm()}>
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

const styles = StyleSheet.create({
  itemStyle: {
    padding: 10,
    marginTop: 2,
    backgroundColor: '#ddd',
    borderColor: '#bbb',
    borderWidth: 1,
    borderRadius: 5,
  },
  switchContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    paddingVertical: 10,
  },
});
