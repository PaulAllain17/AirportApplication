import React, { Component } from 'react';
import {NotificationManager} from 'react-notifications';

import List from '@material-ui/core/List';
import Flight from './Flight.jsx';

export default class Flights extends Component {
  constructor(props) {
		super(props);
    this.state = { turnAroundTime: 2400, midnight: 86400 };
  }

  addRotationFlight(e, data) {
    if (!this.validateFlight(data)){
      return;
    }
    const newPercentage = this.props.currentPercentage + Math.round((data.arrivaltime - data.departuretime) * 100 / this.state.midnight);
    const { rotationObject, aircraft } = this.getNewData(newPercentage);

    this.props.setFlightChange(this.props.rotation.concat(data),
                                this.props.flights.filter(flight => flight.id !== data.id ),
                                newPercentage, 
                                this.props.rotations.filter(rotationObject => rotationObject.aircraft.ident !== this.props.activeAircraft)
                                                    .concat({aircraft: rotationObject.aircraft, rotation: this.props.rotation.concat(data)}),
                                this.props.aircrafts.filter(aircraft => aircraft.aircraft.ident !== this.props.activeAircraft)
                                                    .concat(aircraft));
    NotificationManager.success('Your flight ' + data.id + ' was added to the current rotation.', 'Flight ' + data.id + ' Added!');
  }

  getNewData(newPercentage) {
    const aircraft = this.props.aircrafts.find(aircraft => aircraft.aircraft.ident === this.props.activeAircraft);
    aircraft.percentage = newPercentage;
    const rotationObject = this.props.rotations.find(rotationObject => rotationObject.aircraft.ident === this.props.activeAircraft);
    return { rotationObject, aircraft };
  }
  
  validateFlight(data){
    const lastRotationFlight = this.props.rotation[this.props.rotation.length - 1];
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
      <div className="flights">
      Flights
       <List>
       {
         this.props.flights.sort((a,b) => a.departuretime - b.departuretime).map(d => {
          return (
            <Flight key={d.id} flight={d} addRotationFlight={this.addRotationFlight.bind(this)}/>)
         })
       }
       </List>
      </div>
    )
  }
}
