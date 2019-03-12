import React, { Component } from 'react';
import {NotificationManager} from 'react-notifications';

import List from '@material-ui/core/List';
import RotationFlight from './RotationFlight.jsx';

export default class Rotation extends Component {
  constructor(props) {
		super(props);
    this.state = { midnight: 86400 };
  }

  removeRotationFlight(e, data) {
    const newPercentage = this.props.currentPercentage - Math.round((data.arrivaltime - data.departuretime) * 100 / this.state.midnight);
    const { rotationObject, aircraft } = this.getNewData(newPercentage);

    this.props.setFlightChange(this.props.rotation.filter(rotationFlight => rotationFlight.id !== data.id ),
                                this.props.flights.concat(data),
                                newPercentage,
                                this.props.rotations.filter(rotationObject => rotationObject.aircraft.ident !== this.props.activeAircraft)
                                                    .concat({aircraft: rotationObject.aircraft, rotation: this.props.rotation.filter(rotationFlight => rotationFlight.id !== data.id )}),
                                this.props.aircrafts.filter(aircraft => aircraft.aircraft.ident !== this.props.activeAircraft)
                                                    .concat(aircraft));
    NotificationManager.success('Your flight ' + data.id + ' was removed from the current rotation.', 'Flight ' + data.id + ' Removed!');
  }

  getNewData(newPercentage) {
    const aircraft = this.props.aircrafts.find(aircraft => aircraft.aircraft.ident === this.props.activeAircraft);
    aircraft.percentage = newPercentage;
    const rotationObject = this.props.rotations.find(rotationObject => rotationObject.aircraft.ident === this.props.activeAircraft);
    return { rotationObject, aircraft };
  }

  render() {
    return (
      <div className="rotations">
        Rotation {this.props.activeAircraft}
       <List>
       {
         this.props.rotation.map(d => {
          return (
            <RotationFlight key={d.id} rotationFlight={d} removeRotationFlight={this.removeRotationFlight.bind(this)}/>)
         })
       }
       </List>
      </div>
    )
  }
}
