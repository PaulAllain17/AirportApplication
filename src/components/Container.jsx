import React, { Component } from 'react';

import Aircrafts from './Aircrafts.jsx';
import Flights from './Flights.jsx';
import Rotation from './Rotation.jsx';

export default class Container extends Component {
  constructor(props) {
		super(props);
		this.state = { data: [] };
	}
	componentWillMount() {
		const xhr = new XMLHttpRequest();
		xhr.open('get', 'https://infinite-dawn-93085.herokuapp.com/aircrafts', true);
		xhr.onload = () => {
			const data = JSON.parse(xhr.responseText);
			this.setState({ data: data.data });
		};
		xhr.send();
	}
  render() {
    return (
      <div>
        <Aircrafts aircrafts={this.state.data}/>
        <Rotation/>
        <Flights url='https://infinite-dawn-93085.herokuapp.com/flights'/>
      </div>
    );
  }
}
