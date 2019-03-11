import React, { Component } from 'react';

import Aircrafts from './Aircrafts.jsx';
import Flights from './Flights.jsx';
import Rotations from './Rotations.jsx';

export default class Container extends Component {
  constructor(props) {
		super(props);
		this.state = { aircrafts: [], flights: [], rotations: [], activeAircraft: null };
  }
  
	componentWillMount() {
    this.getAircrafts();
    this.getFlights();
  }
  
  getAircrafts(){
    const xhr = new XMLHttpRequest();
		xhr.open('get', 'https://infinite-dawn-93085.herokuapp.com/aircrafts', true);
		xhr.onload = () => {
      const data = JSON.parse(xhr.responseText);
			this.setState({ aircrafts: data.data, activeAircraft: data.data[0] });
		};
		xhr.send();
  }

  getFlights(){
    const xhr = new XMLHttpRequest();
		xhr.open('get', 'https://infinite-dawn-93085.herokuapp.com/flights', true);
		xhr.onload = () => {
      const data = JSON.parse(xhr.responseText);
			this.setState({ flights: data.data });
		};
		xhr.send();
  }

  addRotation(e, data) {
    this.setState({rotations: this.state.rotations.concat(data), 
                   flights: this.state.flights.filter(flight => flight.id != data.id )});
  }

  removeRotation(e, data) {
    this.setState({rotations: this.state.rotations.filter(rotation => rotation.id != data.id ), 
                   flights: this.state.flights.concat(data)});
  }

  render() {
    return (
      <div>
        <Aircrafts aircrafts={this.state.aircrafts}/>
        <Rotations activeAircraft={this.state.activeAircraft ? this.state.activeAircraft.ident : ""} rotations={this.state.rotations} removeRotation={this.removeRotation.bind(this)}/>
        <Flights flights={this.state.flights} addRotation={this.addRotation.bind(this)}/>
      </div>
    );
  }
}
