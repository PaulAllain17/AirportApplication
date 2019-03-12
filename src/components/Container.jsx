import React, { Component } from 'react';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

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
    NotificationManager.success('Your flight ' + data.id + ' was added to the current rotation.', 'Flight ' + data.id + ' Added!');
  }

  removeRotationFlight(e, data) {
    const rotationObject = this.state.rotations.find(rotationObject => rotationObject.aircraft.ident === this.state.activeAircraft.ident);
    this.setState({rotation: this.state.rotation.filter(rotationFlight => rotationFlight.id !== data.id ), 
                   flights: this.state.flights.concat(data),
                   rotations: this.state.rotations.filter(rotationObject => rotationObject.aircraft.ident !== this.state.activeAircraft.ident)
                   .concat({aircraft: rotationObject.aircraft, rotation: this.state.rotation.filter(rotationFlight => rotationFlight.id !== data.id )})});
    NotificationManager.success('Your flight ' + data.id + ' was removed from the current rotation.', 'Flight ' + data.id + ' Removed!');
  }

  selectAircraft(e, data) {
    this.setState({activeAircraft: data,
                   rotation: this.state.rotations.find(rotationObject => rotationObject.aircraft.ident === data.ident).rotation});
    NotificationManager.info('You are now looking at the rotation for the aircraft ' + data.ident + '.');
  }

  render() {
    return (
      <div>
        <Aircrafts aircrafts={this.state.aircrafts} selectAircraft={this.selectAircraft.bind(this)}/>
        <Rotation activeAircraft={this.state.activeAircraft ? this.state.activeAircraft.ident : ""}
                   rotation={this.state.rotation} removeRotationFlight={this.removeRotationFlight.bind(this)}/>
        <Flights flights={this.state.flights} addRotationFlight={this.addRotationFlight.bind(this)}/>
        <NotificationContainer/>
      </div>
    );
  }
}
