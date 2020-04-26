import React, {Component} from 'react';
import {View, FlatList, Alert, StyleSheet} from 'react-native';
import {Container, Card, CardItem, Text, Body, Right} from 'native-base';
import {Title, Subheading} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';
export default class ExpandibleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayCard: this.props.displayCard,
      name: this.props.name,
      medicines: this.props.medicines,
    };
  }
  display(displayCard) {
    this.setState({
      displayCard: displayCard,
    });
  }
  render() {
    const {displayCard, name, medicines} = this.state;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.textView}
          onPress={() => this.display(!displayCard)}>
          <Text style={styles.texto}>{name}</Text>
          <Icon name="chevron-down" size={30} style={styles.texto} />
        </TouchableOpacity>
        {displayCard && (
          <FlatList
            data={medicines}
            renderItem={({item}) => (
              <Card>
                <CardItem>
                  <Body>
                    <Subheading>Medicamento: {item.name}</Subheading>
                    <Subheading>
                      Vía de administración: {item.administration_route}
                    </Subheading>
                    <Subheading>Indicaciones: {item.indications}</Subheading>
                  </Body>
                </CardItem>
              </Card>
            )}
            keyExtractor={item => item.id}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  texto: {
    textAlign: 'center',
    alignSelf: 'center',
  },
  textView: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#E5EDFF',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
  },
  container: {
    margin: 10,
    marginBottom: 3,
  },
});
