import React, {Component} from 'react';
import {View, Alert} from 'react-native';
import {Content, Container} from 'native-base';
import {ActivityIndicator, Button, TextInput} from 'react-native-paper';
import AppHeader from '../../Components/organisms/Header';
import firestore from '@react-native-firebase/firestore';
export default class AddMedicine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sendForm: false,
      name: '',
      administration_route: '',
    };
  }
  sendMedicine() {
    this.setState({sendForm: !this.state.sendForm});
    const {name, administration_route} = this.state;
    setTimeout(() => {
      firestore()
        .collection('medicines')
        .add({
          name: name.trim(),
          administration_route: administration_route.trim(),
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
  render() {
    const {sendForm} = this.state;
    return (
      <Container>
        <AppHeader
          title="Agregar Medicamento"
          navigation={this.props.navigation}
          icon="arrow-left"
        />
        <Content padder>
          <TextInput
            label="Nombre"
            returnKeyType={'next'}
            onChangeText={text => this.setState({name: text})}
            onSubmitEditing={() => this.administrationRouteInput.focus()}
            mode="outlined"
            style={{paddingTop: 5}}
          />
          <TextInput
            label="Vía de asminitracion"
            returnKeyType={'go'}
            onChangeText={text => this.setState({administration_route: text})}
            ref={input => (this.administrationRouteInput = input)}
            mode="outlined"
            style={{paddingTop: 10}}
          />
          <View style={{paddingTop: 15}}>
            <Button
              color="#FF7058"
              mode="contained"
              dark={true}
              onPress={() =>
                this.state.administration_route.length > 0 &&
                this.state.name.length > 0
                  ? this.sendMedicine()
                  : Alert.alert(
                      'Advertencia',
                      'Todos los campos son necesarios.',
                    )
              }>
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
