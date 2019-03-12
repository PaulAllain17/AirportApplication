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

  selectAircraft(e, data) {
    const newAircraft = this.state.aircrafts.find(aircraft => aircraft.aircraft.ident === data.ident);
    this.setState({activeAircraft: data,
                   currentPercentage: newAircraft.percentage,
                   rotation: this.state.rotations.find(rotationObject => rotationObject.aircraft.ident === data.ident).rotation});
    NotificationManager.info('You are now looking at the rotation for the aircraft ' + data.ident + '.');
  }

  render() {
    return (
      <div>
        <DataService setAircrafts={this.setAircrafts.bind(this)} setFlights={this.setFlights.bind(this)}/>
        <Aircrafts aircrafts={this.state.aircrafts} selectAircraft={this.selectAircraft.bind(this)}/>
        <Rotation flights={this.state.flights} rotation={this.state.rotation} rotations={this.state.rotations}
                  aircrafts={this.state.aircrafts} activeAircraft={this.state.activeAircraft ? this.state.activeAircraft.ident : ""}
                  currentPercentage={this.state.currentPercentage} setFlightChange={this.setFlightChange.bind(this)}/>
        <Flights flights={this.state.flights} rotation={this.state.rotation} rotations={this.state.rotations}
                  aircrafts={this.state.aircrafts} activeAircraft={this.state.activeAircraft ? this.state.activeAircraft.ident : ""}
                  currentPercentage={this.state.currentPercentage} setFlightChange={this.setFlightChange.bind(this)}/>
        <NotificationContainer/>
      </div>
    );
  }
}
