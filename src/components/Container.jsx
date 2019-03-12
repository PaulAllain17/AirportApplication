import React, { Component } from 'react';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import Aircrafts from './Aircrafts.jsx';
import Flights from './Flights.jsx';
import Rotation from './Rotation.jsx';
import DataService from './DataService.jsx';

export default class Container extends Component {
  constructor(props) {
		super(props);
    this.state = { aircrafts: [], flights: [], rotation: [], rotations: null, activeAircraft: null,
                   currentPercentage: 0 };
  }

  setFlights(data){
    this.setState({ flights: data });
  }

  setAircrafts(aircraftList, newActiveAircraft, rotationObject){
    this.setState({ aircrafts: aircraftList, activeAircraft: newActiveAircraft, rotations: rotationObject });
  }

  setFlightChange(newRotation, newFlights, newPercentage, newRotations, newAircrafts){
    this.setState({ rotation: newRotation, flights: newFlights, currentPercentage: newPercentage,
                    rotations: newRotations, aircrafts: newAircrafts });
  }

  removeRotationFlight(e, data) {
    const newPercentage = this.state.currentPercentage - Math.round((data.arrivaltime - data.departuretime) * 100 / 86400);

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

  render() {
    return (
      <div>
        <DataService setAircrafts={this.setAircrafts.bind(this)} setFlights={this.setFlights.bind(this)}/>
        <Aircrafts aircrafts={this.state.aircrafts} selectAircraft={this.selectAircraft.bind(this)}/>
        <Rotation activeAircraft={this.state.activeAircraft ? this.state.activeAircraft.ident : ""}
                   rotation={this.state.rotation} removeRotationFlight={this.removeRotationFlight.bind(this)}/>
        <Flights flights={this.state.flights} rotation={this.state.rotation} rotations={this.state.rotations}
                  aircrafts={this.state.aircrafts} activeAircraft={this.state.activeAircraft ? this.state.activeAircraft.ident : ""}
                  currentPercentage={this.state.currentPercentage} setFlightChange={this.setFlightChange.bind(this)}/>
        <NotificationContainer/>
      </div>
    );
  }
}
