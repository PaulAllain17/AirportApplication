import React, { Component } from 'react';

import Aircrafts from './Aircrafts.jsx';
import Flights from './Flights.jsx';
import Rotation from './Rotation.jsx';

export default class Container extends Component {
  constructor(props) {
		super(props);
		this.state = { aircrafts: [], flights: [], rotation: [], rotations: null, activeAircraft: null };
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
      const rotationObject = [{"ident":"GABCD","type":"A320","economySeats":186,"base":"EGKK"},{"ident":"HDBCD","type":"C820","economySeats":200,"base":"LDTT"}]
                             .map(aircraft => { return {aircraft: aircraft, rotation: []} });
      this.setState({ aircrafts: [{"ident":"GABCD","type":"A320","economySeats":186,"base":"EGKK"},{"ident":"HDBCD","type":"C820","economySeats":200,"base":"LDTT"}],
                      activeAircraft: data.data[0], rotations: rotationObject });
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
    const rotationObject = this.state.rotations.find(rotationObject => rotationObject.aircraft.ident === this.state.activeAircraft.ident);
    this.setState({rotation: this.state.rotation.concat(data), 
                   flights: this.state.flights.filter(flight => flight.id !== data.id ),
                   rotations: this.state.rotations.filter(rotationObject => rotationObject.aircraft.ident !== this.state.activeAircraft.ident)
                   .concat({aircraft: rotationObject.aircraft, rotation: this.state.rotation.concat(data)})});
  }

  removeRotationFlight(e, data) {
    const rotationObject = this.state.rotations.find(rotationObject => rotationObject.aircraft.ident === this.state.activeAircraft.ident);
    this.setState({rotation: this.state.rotation.filter(rotationFlight => rotationFlight.id !== data.id ), 
                   flights: this.state.flights.concat(data),
                   rotations: this.state.rotations.filter(rotationObject => rotationObject.aircraft.ident !== this.state.activeAircraft.ident)
                   .concat({aircraft: rotationObject.aircraft, rotation: this.state.rotation.filter(rotationFlight => rotationFlight.id !== data.id )})});
  }

  selectAircraft(e, data) {
    this.setState({activeAircraft: data,
                   rotation: this.state.rotations.find(rotationObject => rotationObject.aircraft.ident === data.ident).rotation});
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
