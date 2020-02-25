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
import {ActivityIndicator, Button} from 'react-native-paper';
import AppHeader from '../../Components/organisms/Header';
import medicines from '../../JSON/medicines.json';
export default class EditPrescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patient: '',
      sendForm: false,
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
          title="Editar Receta"
          navigation={this.props.navigation}
          icon="arrow-left"
        />
        <Content padder>
          <Form>
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
                  selectedValue={this.state.patient}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({patient: itemValue})
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
