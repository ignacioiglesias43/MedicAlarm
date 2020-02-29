import React, {Component, Fragment} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Content, Container, Textarea} from 'native-base';
import {ActivityIndicator, Button} from 'react-native-paper';
import AppHeader from '../../Components/organisms/Header';
import SearchableDropdown from 'react-native-searchable-dropdown';
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
      selectedPatient: [],
      selectedMedicines: [],
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
        <Content>
          <Fragment>
            <View>
              <SearchableDropdown
                selectedItems={this.state.selectedPatient}
                onItemSelect={item => {
                  const items = this.state.selectedPatient;
                  items.push(item);
                  this.setState({selectedPatient: items});
                }}
                containerStyle={{padding: 5}}
                onRemoveItem={(item, index) => {
                  const items = this.state.selectedPatient.filter(
                    sitem => sitem.id !== item.id,
                  );
                  this.setState({selectedPatient: items});
                }}
                itemStyle={styles.itemStyle}
                itemTextStyle={{color: '#222'}}
                itemsContainerStyle={{maxHeight: 140}}
                items={data}
                resetValue={false}
                textInputProps={{
                  placeholder: 'Seleccione un paciente',
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
            </View>
            <View>
              <SearchableDropdown
                multi={true}
                selectedItems={this.state.selectedMedicines}
                onItemSelect={item => {
                  const items = this.state.selectedMedicines;
                  items.push(item);
                  this.setState({selectedMedicines: items});
                }}
                containerStyle={{padding: 5}}
                onRemoveItem={(item, index) => {
                  const items = this.state.selectedMedicines.filter(
                    sitem => sitem.id !== item.id,
                  );
                  this.setState({selectedMedicines: items});
                }}
                itemStyle={styles.itemStyle}
                itemTextStyle={{color: '#222'}}
                itemsContainerStyle={{maxHeight: 140}}
                items={medicines}
                chip={true}
                resetValue={false}
                textInputProps={{
                  placeholder: 'Seleccione uno o más medicamentos',
                  underlineColorAndroid: 'transparent',
                  style: {
                    padding: 12,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 5,
                  },
                }}
                listProps={{
                  nestedScrollEnabled: true,
                }}
              />
            </View>
            {this.state.selectedMedicines.map(item => (
              <View style={{padding: 5}} key={item.id}>
                <Text>{item.name}</Text>
                <Textarea
                  style={{
                    padding: 12,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 5,
                    width: '100%',
                  }}
                  rowSpan={5}
                  bordered
                  placeholder="Indicaciones"
                  placeholderTextColor="#cc"
                />
              </View>
            ))}
            <View style={{paddingTop: 15, paddingLeft: 5, paddingRight: 5}}>
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
          </Fragment>
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
});
