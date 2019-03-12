import React, { Component } from 'react';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import Aircrafts from './Aircrafts.jsx';
import Flights from './Flights.jsx';
import Rotation from './Rotation.jsx';

export default class Container extends Component {
  constructor(props) {
		super(props);
    this.state = { aircrafts: [], flights: [], rotation: [], rotations: null, activeAircraft: null,
                   currentPercentage: 0, turnAroundTime: 2400, midnight: 86400, validAircraftType: "A320" };
  }
  
	componentWillMount() {
    this.getAircrafts();
    this.getFlights();
  }
  
  getAircrafts(){
    const xhr = new XMLHttpRequest();
		xhr.open('get', 'https://infinite-dawn-93085.herokuapp.com/aircrafts', true);
		xhr.onload = () => {
      let data = JSON.parse(xhr.responseText).data.filter(aircraft => aircraft.type === this.state.validAircraftType);
      data = [{"ident":"GABCD","type":"A320","economySeats":186,"base":"LFSB"},{"ident":"ERBCD","type":"A320","economySeats":200,"base":"EHAM"}
                  ,{"ident":"HDBCD","type":"A320","economySeats":200,"base":"LEBL"}];
      const rotationObject = data.map(aircraft => { return {aircraft: aircraft, rotation: []} });
      const aircraftList = data.map(aircraft => { return {aircraft: aircraft, percentage: 0} });
      this.setState({ aircrafts: aircraftList, activeAircraft: data[0], rotations: rotationObject });
		};
		xhr.send();
  }

  getFlights(){
    const xhr = new XMLHttpRequest();
		xhr.open('get', 'https://infinite-dawn-93085.herokuapp.com/flights', true);
		xhr.onload = () => {
      const data = JSON.parse(xhr.responseText).data;
			this.setState({ flights: data });
		};
		xhr.send();
  }

  addRotationFlight(e, data) {
    if (!this.validateFlight(data)){
      return;
    }
    
    const newPercentage = this.state.currentPercentage + Math.round((data.arrivaltime - data.departuretime) * 100 / this.state.midnight);

    const { rotationObject, aircraft } = this.getNewData(newPercentage);

    this.setState({rotation: this.state.rotation.concat(data), 
                   flights: this.state.flights.filter(flight => flight.id !== data.id ),
                   currentPercentage: newPercentage,
                   rotations: this.state.rotations.filter(rotationObject => rotationObject.aircraft.ident !== this.state.activeAircraft.ident)
                                                  .concat({aircraft: rotationObject.aircraft, rotation: this.state.rotation.concat(data)}),
                   aircrafts: this.state.aircrafts.filter(aircraft => aircraft.aircraft.ident !== this.state.activeAircraft.ident)
                                                  .concat(aircraft)});
    NotificationManager.success('Your flight ' + data.id + ' was added to the current rotation.', 'Flight ' + data.id + ' Added!');
  }

  removeRotationFlight(e, data) {
    const newPercentage = this.state.currentPercentage - Math.round((data.arrivaltime - data.departuretime) * 100 / this.state.midnight);

    const { rotationObject, aircraft } = this.getNewData(newPercentage);

    this.setState({rotation: this.state.rotation.filter(rotationFlight => rotationFlight.id !== data.id ), 
                   flights: this.state.flights.concat(data),
                   currentPercentage: newPercentage,
                   rotations: this.state.rotations.filter(rotationObject => rotationObject.aircraft.ident !== this.state.activeAircraft.ident)
                                                  .concat({aircraft: rotationObject.aircraft, rotation: this.state.rotation.filter(rotationFlight => rotationFlight.id !== data.id )}),
                   aircrafts: this.state.aircrafts.filter(aircraft => aircraft.aircraft.ident !== this.state.activeAircraft.ident)
                                                  .concat(aircraft)});
    NotificationManager.success('Your flight ' + data.id + ' was removed from the current rotation.', 'Flight ' + data.id + ' Removed!');
  }

  selectAircraft(e, data) {
    const newAircraft = this.state.aircrafts.find(aircraft => aircraft.aircraft.ident === data.ident);
    this.setState({activeAircraft: data,
                   currentPercentage: newAircraft.percentage,
                   rotation: this.state.rotations.find(rotationObject => rotationObject.aircraft.ident === data.ident).rotation});
    NotificationManager.info('You are now looking at the rotation for the aircraft ' + data.ident + '.');
  }

  getNewData(newPercentage) {
    const aircraft = this.state.aircrafts.find(aircraft => aircraft.aircraft.ident === this.state.activeAircraft.ident);
    aircraft.percentage = newPercentage;
    const rotationObject = this.state.rotations.find(rotationObject => rotationObject.aircraft.ident === this.state.activeAircraft.ident);
    return { rotationObject, aircraft };
  }

  validateFlight(data){
    const lastRotationFlight = this.state.rotation[this.state.rotation.length - 1];
    if (lastRotationFlight !== undefined){
      if (lastRotationFlight.destination !== data.origin){
        NotificationManager.error('Your flight ' + data.id + ' needs do depart from ' + lastRotationFlight.destination, 'Wrong Origin!');
        return false;
      }
      if (lastRotationFlight.arrivaltime + this.state.turnAroundTime > data.departuretime){
        NotificationManager.error('Your flight ' + data.id +
        ' is too early and should start at least 40min after the arrival time of the previous flight in the current rota.', 'Too Early!');
        return false;
      }
      if (data.arrivaltime > this.state.midnight){
        NotificationManager.error('Your flight ' + data.id + ' cannot arrive any later than midnight.', 'Too Late!');
        return false;
      }
      return true;
    }
    return true;
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
