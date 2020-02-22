import React, {Component} from 'react';
import {
  Container,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
} from 'native-base';
import {IconButton} from 'react-native-paper';
export default class PatientsList extends Component {
  render() {
    return (
      <Container>
        <Content>
          <List>
            <ListItem avatar icon>
              <Left>
                <Thumbnail source={require('../../img/usuario.png')} />
              </Left>
              <Body>
                <Text>Walter White</Text>
              </Body>
              <Right>
                <IconButton
                  icon="trash-can-outline"
                  color="red"
                  onPress={() => console.log('Pressed')}
                />
              </Right>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}
