import React, {Component} from 'react';
import {Container} from 'native-base';
import data from '../../JSON/prescriptions.json';
import ExpandibleList from './src/../ExpandibleList';
export default class PatientPrescriptionList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Container>
        {data.map(item => (
          <ExpandibleList
            id={item.id}
            name={'Dr. ' + item.name}
            displayCard={false}
            medicine={item.medicine}
            indications={item.indications}
          />
        ))}
      </Container>
    );
  }
}
