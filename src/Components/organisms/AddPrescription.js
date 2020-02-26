import React, {Component} from 'react';
import {View, FlatList, Text} from 'react-native';
import {
  Picker,
  Content,
  Form,
  Item,
  Container,
  Icon,
  Textarea,
} from 'native-base';
import {ActivityIndicator, Button, IconButton} from 'react-native-paper';
import AppHeader from '../../Components/organisms/Header';
import data from '../../JSON/patientsAdded.json';
import medicines from '../../JSON/medicines.json';
export default class AddPrescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patient: '',
      medicine: '',
      sendForm: false,
      addAnother: false,
    };
  }
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
          title="Agregar Receta"
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
              <View style={{paddingTop: 10}}>
                <Text>Seleccione un medicamento:</Text>
              </View>
              <Item picker>
                <Picker
                  style={{width: undefined}}
                  iosIcon={<Icon name="arrow-down" />}
                  placeholder="Seleccione un paciente"
                  placeholderStyle={{color: '#bfc6ea'}}
                  placeholderIconColor="#007aff"
                  selectedValue={this.state.medicine}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({medicine: itemValue})
                  }>
                  {medicines.map(item => (
                    <Picker.Item
                      label={item.name}
                      value={item.id}
                      key={item.id}
                    />
                  ))}
                </Picker>
              </Item>
            </View>
            <View style={{alignSelf: 'center'}}>
              <Button
                icon="plus-circle"
                mode="text"
                color="#FF7058"
                size={20}
                onPress={() => this.setState({addAnother: true})}>
                Añadir otro medicamento
              </Button>
            </View>
            <Item picker>
              <Textarea
                rowSpan={10}
                bordered
                style={{width: '100%'}}
                placeholder="Mensaje"
              />
            </Item>
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
