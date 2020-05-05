import React, {Component} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Alert} from 'react-native';
import {Picker, Content, Form, Item, Container} from 'native-base';
import {ActivityIndicator, Button, TextInput, Switch} from 'react-native-paper';
import AppHeader from '../../Components/organisms/Header';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import SearchableDropdown from 'react-native-searchable-dropdown';
import firestore from '@react-native-firebase/firestore';
import PushNotification from 'react-native-push-notification';

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
      frequency: '',
      hourText: '',
      dateText: '',
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
  showHourPicker = () => {
    this.setState({
      isHourVisible: true,
    });
  };
  pushNotif = (
    id,
    subject,
    date,
    user,
    trustedContact,
    monitoring,
    frequency,
    totalShots,
  ) => {
    PushNotification.localNotificationSchedule({
      id: `${id}`,
      title: 'Continuar con su tratamiento',
      userInfo: {
        user: user,
        trustedContact: trustedContact,
        monitoring: monitoring,
        subject: subject,
        frequency: frequency,
        totalShots: totalShots,
        cont: 0,
      },
      color: 'red',
      ongoing: true,
      vibrate: true,
      vibration: 300,
      autoCancel: false,
      allowWhileIdle: true,
      importance: 'max',
      actions: '["Listo", "Posponer"]',
      message: `Hora de tomar su medicamento ${subject}`,
      soundName: 'clock.mp3',
      date: date,
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
      dateText,
    } = this.state;
    this.setState({sendForm: !this.state.sendForm});
    /**Calcula el numero de veces que tiene que ingerir el medicamento */
    let totalShots = (parseInt(dateText, 10) * 24) / parseInt(frequency, 10);
    /**Genera un id unico para las alarmas */
    const alarmId = Math.floor(Math.random() * 100);
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
          total_of_days: dateText,
          total_shots: totalShots,
          id_alarm: alarmId,
          cont_shots: 0,
        })
        .then(() => {
          let date = new Date(Date.now());
          date.setHours(chosenHour.getHours());
          date.setMinutes(chosenHour.getMinutes());
          date.setSeconds(0);
          this.setState({sendForm: !this.state.sendForm});
          this.pushNotif(
            alarmId,
            subjectText,
            date,
            user,
            selectedTrustedContact,
            isSwitchOn,
            frequency,
            totalShots,
          );
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
      dateText,
      frequency,
    } = this.state;
    if (
      subjectText.length > 0 &&
      hourText.length > 0 &&
      dateText.length > 0 &&
      frequency.length > 0
    ) {
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
      Alert.alert('Advertencia', 'Todos los campos son necesarios.');
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
              onSubmitEditing={() => this.numberDaysInput.focus()}
              style={{paddingTop: 5, paddingBottom: 5}}
            />
            <View>
              <TextInput
                label="Cuantos días sonará su alarma"
                value={this.state.dateText}
                onChangeText={text => this.setState({dateText: text})}
                keyboardType="numeric"
                ref={input => (this.numberDaysInput = input)}
                returnKeyType={'next'}
                mode="outlined"
                onSubmitEditing={() => this.frequencyInput.focus()}
                style={{paddingBottom: 5}}
              />
            </View>
            <View>
              <TextInput
                label="Frecuencia de su alarma (horas)"
                value={this.state.frequency}
                ref={input => (this.frequencyInput = input)}
                onChangeText={text => this.setState({frequency: text})}
                keyboardType="numeric"
                returnKeyType={'done'}
                mode="outlined"
                style={{paddingBottom: 10}}
              />
            </View>
            <View>
              <Button
                color="#FF7058"
                mode="outlined"
                dark={true}
                onPress={() => this.showHourPicker()}>
                {this.state.hourText.length === 0
                  ? 'Seleccionar hora inicial'
                  : `Hora seleccionada: ${this.state.hourText}`}
              </Button>
              <DateTimePickerModal
                isVisible={this.state.isHourVisible}
                mode="time"
                onConfirm={this.handleHourPicker}
                onCancel={this.hideHourPicker}
              />
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
