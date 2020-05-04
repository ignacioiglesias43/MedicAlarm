import React, {Component} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Alert} from 'react-native';
import {Picker, Content, Form, Item, Container} from 'native-base';
import {ActivityIndicator, Button, TextInput, Switch} from 'react-native-paper';
import AppHeader from '../../Components/organisms/Header';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import SearchableDropdown from 'react-native-searchable-dropdown';
import PushNotification from 'react-native-push-notification';
import firestore from '@react-native-firebase/firestore';
export default class EditAlarms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSwitchOn: props.route.params.monitoring,
      id_alarm: props.route.params.id_alarm,
      patient: '',
      user: props.route.params.user,
      sendForm: false,
      isHourVisible: false,
      chosenHour: new Date(),
      contacts: [],
      selectedTrustedContact: props.route.params.trusted_contact,
      subjectText: JSON.stringify(props.route.params.subject).replace(/"/g, ''),
      frequency: props.route.params.frequency,
      hourText: JSON.stringify(props.route.params.hour).replace(/"/g, ''),
      dateText: JSON.stringify(props.route.params.total_of_days).replace(
        /"/g,
        '',
      ),
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
          let dx = Object.assign(d.data(), {
            id: d.id,
          });
          dataBase.push(dx);
        });
        this.setState({contacts: dataBase});
      })
      .catch(e => console.log(e));
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
  hideHourPicker = () => {
    this.setState({
      isHourVisible: false,
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
  editAlarm() {
    const {route} = this.props;
    const {
      selectedTrustedContact,
      user,
      isSwitchOn,
      hourText,
      subjectText,
      frequency,
      dateText,
      chosenHour,
    } = this.state;
    let totalShots = (parseInt(dateText, 10) * 24) / parseInt(frequency, 10);
    this.setState({
      sendForm: !this.state.sendForm,
    });
    setTimeout(() => {
      firestore()
        .collection('alarms')
        .doc(route.params.id)
        .update({
          subject: subjectText,
          frequency: frequency,
          monitoring: isSwitchOn,
          next_hour: hourText,
          patient: user,
          trusted_contact: selectedTrustedContact,
          total_of_days: dateText,
          total_shots: totalShots,
          id_alarm: this.state.id_alarm,
        })
        .then(() => {
          let date = new Date(Date.now());
          date.setHours(chosenHour.getHours());
          date.setMinutes(chosenHour.getMinutes());
          date.setSeconds(0);
          this.setState({
            sendForm: !this.state.sendForm,
          });
          PushNotification.clearLocalNotification(this.state.id_alarm);
          this.pushNotif(
            this.state.id_alarm,
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
          this.setState({
            sendForm: !this.state.sendForm,
          });
          Alert.alert('Error', e.message);
        });
    }, 1000);
  }
  sendAlarm() {
    const {
      selectedTrustedContact,
      isSwitchOn,
      subjectText,
      hourText,
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
          this.editAlarm();
        } else {
          Alert.alert(
            'Advertencia',
            'Si desea monitorear una alarma, debe seleccionar un contacto de confianza.',
          );
        }
      } else {
        this.editAlarm();
      }
    } else {
      Alert.alert(
        'Advertencia',
        'El campo Asunto es necesario, no lo puede dejar vacío.',
      );
    }
  }
  componentWillMount() {
    this.getContacts();
  }
  render() {
    this.getContacts();
    const {sendForm, isSwitchOn, contacts, selectedTrustedContact} = this.state;
    return (
      <Container>
        <AppHeader
          title="Editar Alarma"
          navigation={this.props.navigation}
          icon="arrow-left"
        />
        <Content padder>
          <Form>
            <TextInput
              label="Asunto"
              defaultValue={this.state.subjectText}
              onChangeText={text => this.setState({subjectText: text})}
              returnKeyType={'next'}
              mode="outlined"
              onSubmitEditing={() => this.numberDaysInput.focus()}
              style={{
                paddingTop: 5,
                paddingBottom: 5,
              }}
            />
            <View>
              <TextInput
                label="Cuantos días sonará su alarma"
                value={this.state.dateText}
                onChangeText={text => this.setState({dateText: text})}
                keyboardType="numeric"
                ref={input => (this.numberDaysInput = input)}
                returnKeyType={'next'}
                onSubmitEditing={() => this.frequencyInput.focus()}
                mode="outlined"
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
                  selectedItems={selectedTrustedContact}
                  onItemSelect={item => {
                    this.setState({
                      selectedTrustedContact: {
                        id: item.id,
                        name: item.name,
                        phone: item.phone,
                      },
                    });
                  }}
                  containerStyle={{padding: 5}}
                  onRemoveItem={(item, index) => {
                    const items = this.state.selectedTrustedContact.filter(
                      sitem => sitem.id !== item.id,
                    );
                    this.setState({
                      selectedTrustedContact: items,
                    });
                  }}
                  itemStyle={styles.itemStyle}
                  itemTextStyle={{color: '#000'}}
                  itemsContainerStyle={{
                    maxHeight: 140,
                  }}
                  items={contacts}
                  chip={true}
                  resetValue={false}
                  placeholderTextColor="#000"
                  textInputProps={{
                    placeholder:
                      selectedTrustedContact.name !== undefined
                        ? `Contacto seleccionado: ${
                            selectedTrustedContact.name
                          }`
                        : 'Seleccione un contacto de emergencia',
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
