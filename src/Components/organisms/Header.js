import React, {Component} from 'react';
import {Appbar} from 'react-native-paper';

export default class Header extends Component {
  constructor(props) {
    super(props);
  }
  headerAction = () => {
    if (this.props.icon === 'menu') {
      this.props.navigation.toggleDrawer();
    } else if (this.props.icon === 'arrow-left') {
      this.props.navigation.goBack();
    }
  };
  addAction = () => {
    this.props.navigation.navigate(this.props.navigateRoute, {
      data: this.props.data,
    });
  };
  render() {
    if (this.props.showAddAction) {
      return (
        <Appbar.Header style={{backgroundColor: '#afc9ff'}}>
          <Appbar.Action icon={this.props.icon} onPress={this.headerAction} />
          <Appbar.Content title={this.props.title} />
          <Appbar.Action icon={this.props.addIcon} onPress={this.addAction} />
        </Appbar.Header>
      );
    } else {
      return (
        <Appbar.Header style={{backgroundColor: '#afc9ff'}}>
          <Appbar.Action icon={this.props.icon} onPress={this.headerAction} />
          <Appbar.Content title={this.props.title} />
        </Appbar.Header>
      );
    }
  }
}
