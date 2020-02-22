import * as React from 'react';
import {Drawer} from 'react-native-paper';

export default class MyComponent extends React.Component {
  state = {
    active: 'first',
  };

  render() {
    const {active} = this.state;

    return (
      <Drawer.Section title="Some title">
        <Drawer.Item
          label="Home"
          active={active === 'first'}
          onPress={() => {
            this.setState({active: 'first'});
          }}
        />
        <Drawer.Item
          label="Pacientes"
          active={active === 'second'}
          onPress={() => {
            this.setState({active: 'second'});
          }}
        />
      </Drawer.Section>
    );
  }
}