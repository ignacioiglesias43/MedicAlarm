import React, {Component, Fragment} from 'react';
import {View, StyleSheet, Text, Alert} from 'react-native';
import {Content, Container, Textarea} from 'native-base';
import {ActivityIndicator, Button} from 'react-native-paper';
import AppHeader from '../../Components/organisms/Header';
import SearchableDropdown from 'react-native-searchable-dropdown';
import firestore from '@react-native-firebase/firestore';
export default class EditPrescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sendForm: false,
      selectedMedicines: props.route.params.medicines,
      medicines: [],
    };
  }
  sendPrescription() {
    const {route} = this.props;
    const {selectedMedicines} = this.state;
    this.setState({sendForm: !this.state.sendForm});
    setTimeout(() => {
      firestore()
        .collection('prescriptions')
        .doc(route.params.id)
        .update({
          doctor: route.params.doctor,
          patient: route.params.patient,
          medicines: selectedMedicines,
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
  componentWillMount() {
    console.log(this.state.selectedMedicines);
    this.getMedicines();
  }
  getMedicines() {
    firestore()
      .collection('medicines')
      .get()
      .then(data => {
        let dataBase = [];
        data.forEach(d => {
          let dx = Object.assign(d.data(), {id: d.id});
          dataBase.push(dx);
        });
        this.setState({medicines: dataBase});
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const {sendForm, medicines, selectedMedicines} = this.state;
    return (
      <Container>
        <AppHeader
          title="Editar Receta"
          navigation={this.props.navigation}
          icon="arrow-left"
        />
        <Content>
          <Fragment>
            <SearchableDropdown
              multi={true}
              selectedItems={selectedMedicines}
              onItemSelect={item => {
                const items = selectedMedicines;
                items.push(item);
                this.setState({selectedMedicines: items});
              }}
              containerStyle={{padding: 5}}
              onRemoveItem={item => {
                const items = selectedMedicines.filter(
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
            {selectedMedicines.map(item => (
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
                  value={
                    selectedMedicines[selectedMedicines.indexOf(item)]
                      .indications
                  }
                  onChangeText={text => {
                    let med = selectedMedicines;
                    med[med.indexOf(item)].indications = text.trim();
                    this.setState({
                      selectedMedicines: med,
                    });
                  }}
                />
              </View>
            ))}
            <View style={{paddingTop: 15, paddingLeft: 5, paddingRight: 5}}>
              <Button
                color="#FF7058"
                mode="contained"
                dark={true}
                onPress={() => {
                  let done = false;
                  selectedMedicines.forEach(med => {
                    med.indications
                      ? med.indications.length > 0
                        ? (done = true)
                        : (done = false)
                      : (done = false);
                  });
                  if (done && selectedMedicines.length > 0) {
                    this.sendPrescription();
                  } else {
                    Alert.alert('Error', 'Todos los campos son necesarios.');
                  }
                }}>
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
