import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Content, Form, Item, Container} from 'native-base';
import {ActivityIndicator, Button} from 'react-native-paper';
import AppHeader from '../../Components/organisms/Header';
import SearchableDropdown from 'react-native-searchable-dropdown';
import data from '../../JSON/alarms.json';

export default class AddTrackingAlarm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patient: '',
      sendForm: false,
      selectedAlarm: [],
    };
  }
  sendAlarm() {
    this.setState({sendForm: !this.state.sendForm});
    console.log(this.state.selectedAlarm);
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
          title="Añadir a Seguimiento"
          navigation={this.props.navigation}
          icon="arrow-left"
        />
        <Content padder>
          <View>
            <SearchableDropdown
              selectedItems={this.state.selectedAlarm}
              onItemSelect={item => {
                const items = this.state.selectedAlarm;
                items.push(item);
                this.setState({selectedAlarm: items});
              }}
              containerStyle={{padding: 5}}
              onRemoveItem={(item, index) => {
                const items = this.state.selectedAlarm.filter(
                  sitem => sitem.id !== item.id,
                );
                this.setState({selectedAlarm: items});
              }}
              itemStyle={styles.itemStyle}
              itemTextStyle={{color: '#222'}}
              itemsContainerStyle={{maxHeight: 140}}
              items={data}
              resetValue={false}
              textInputProps={{
                placeholder: 'Seleccione una alarma',
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
});
