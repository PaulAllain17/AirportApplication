import React, { Component } from 'react';

import Aircrafts from './Aircrafts.jsx';
import Flights from './Flights.jsx';
import Rotation from './Rotation.jsx';

export default class Container extends Component {
  constructor(props) {
		super(props);
		this.state = { aircrafts: [], flights: [], rotation: [], activeAircraft: null };
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
			this.setState({ aircrafts: [{"ident":"GABCD","type":"A320","economySeats":186,"base":"EGKK"},{"ident":"HDBCD","type":"C820","economySeats":200,"base":"LDTT"}], activeAircraft: data.data[0] });
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

  addRotationFlight(e, data) {
    this.setState({rotation: this.state.rotation.concat(data), 
                   flights: this.state.flights.filter(flight => flight.id != data.id )});
  }

  removeRotationFlight(e, data) {
    this.setState({rotation: this.state.rotation.filter(rotationFlight => rotationFlight.id != data.id ), 
                   flights: this.state.flights.concat(data)});
  }

  selectAircraft(e, data) {
    this.setState({activeAircraft: data});
  }

  render() {
    return (
      <div>
        <Aircrafts aircrafts={this.state.aircrafts} selectAircraft={this.selectAircraft.bind(this)}/>
        <Rotation activeAircraft={this.state.activeAircraft ? this.state.activeAircraft.ident : ""}
                   rotation={this.state.rotation} removeRotationFlight={this.removeRotationFlight.bind(this)}/>
        <Flights flights={this.state.flights} addRotationFlight={this.addRotationFlight.bind(this)}/>
      </div>
    );
  }
}
