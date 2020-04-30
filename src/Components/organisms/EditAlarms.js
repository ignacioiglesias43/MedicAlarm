import React, {Component} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Alert} from 'react-native';
import {Picker, Content, Form, Item, Container} from 'native-base';
import {ActivityIndicator, Button, TextInput, Switch} from 'react-native-paper';
import AppHeader from '../../Components/organisms/Header';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import SearchableDropdown from 'react-native-searchable-dropdown';
import firestore from '@react-native-firebase/firestore';
export default class EditAlarms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSwitchOn: props.route.params.monitoring,
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
  editAlarm() {
    const {route} = this.props;
    const {
      selectedTrustedContact,
      user,
      isSwitchOn,
      hourText,
      subjectText,
      frequency,
    } = this.state;
    this.setState({sendForm: !this.state.sendForm});
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
        })
        .then(() => {
          this.setState({sendForm: !this.state.sendForm});
          this.props.navigation.goBack();
        })
        .catch(e => {
          this.setState({sendForm: !this.state.sendForm});
          Alert.alert('Error', e.message);
        });
    }, 1000);
  }
  sendAlarm() {
    const {selectedTrustedContact, isSwitchOn, subjectText} = this.state;
    if (subjectText.length > 0) {
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
              style={{paddingTop: 5}}
            />
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
                    this.setState({selectedTrustedContact: items});
                  }}
                  itemStyle={styles.itemStyle}
                  itemTextStyle={{color: '#000'}}
                  itemsContainerStyle={{maxHeight: 140}}
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
