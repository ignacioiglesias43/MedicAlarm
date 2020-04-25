import React, {Component} from 'react';
import {Container, Card, CardItem, Body, Right, Text} from 'native-base';
import {Title, IconButton, Subheading} from 'react-native-paper';
import {FlatList, StyleSheet, Alert, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
export default class ContactList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.data,
      contacts: [],
      refreshing: false,
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
        this.setState({contacts: dataBase, refreshing: false});
      })
      .catch(e => console.log(e));
  }
  componentWillMount() {
    this.getContacts();
  }
  handleRefresh = () => {
    this.setState(
      {
        refreshing: true,
      },
      () => {
        this.getContacts();
      },
    );
  };
  deleteContact(id, index) {
    firestore()
      .collection('trusted-contacts')
      .doc(id)
      .delete()
      .then(() => {
        let newData = this.state.contacts;
        newData.splice(index, 1);
        this.setState({
          contacts: newData,
        });
        Alert.alert(
          'Contacto eliminado',
          'Ha eliminado un contacto con éxito.',
        );
      })
      .catch(e => Alert.alert('Error', e.message));
  }
  render() {
    this.getContacts();
    const {refreshing, contacts, user} = this.state;
    let filteredContacts = contacts.filter(contact => {
      return contact.name.indexOf(this.props.query) !== -1;
    });
    return (
      <Container>
        {contacts.length > 0 ? (
          <FlatList
            data={filteredContacts}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <Card>
                <CardItem>
                  <Body>
                    <Title>{item.name}</Title>
                    <Subheading>Número de teléfono: {item.phone}</Subheading>
                  </Body>
                  <Right>
                    <IconButton
                      icon="pencil"
                      onPress={() =>
                        this.props.navigation.push('EditContact', {
                          id: item.id,
                          name: item.name,
                          phone: item.phone,
                          patient: user,
                        })
                      }
                    />
                    <IconButton
                      icon="trash-can-outline"
                      color="red"
                      onPress={() =>
                        Alert.alert(
                          'Eliminar Contacto',
                          'Está por eliminar a su contacto ' +
                            item.name +
                            '.\n¿Desea Continuar?',
                          [
                            {
                              text: 'Cancelar',
                              style: 'cancel',
                            },
                            {
                              text: 'Eliminar',
                              onPress: () =>
                                this.deleteContact(
                                  item.id,
                                  contacts.indexOf(item),
                                ),
                            },
                          ],
                          {cancelable: false},
                        )
                      }
                    />
                  </Right>
                </CardItem>
              </Card>
            )}
            refreshing={refreshing}
            onRefresh={this.handleRefresh}
            keyExtractor={item => item.id}
          />
        ) : (
          <View style={styles.noRegisterView}>
            <Text style={styles.noRegisterViewText}>
              No hay registros de contactos
            </Text>
          </View>
        )}
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  mainStyle: {flex: 1, flexDirection: 'column'},
  noRegisterView: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: 250,
  },
  noRegisterViewText: {color: 'gray', fontStyle: 'italic', fontSize: 20},
});
