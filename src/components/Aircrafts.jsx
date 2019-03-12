import React, { Component } from 'react';
import {NotificationManager} from 'react-notifications';

import List from '@material-ui/core/List';
import Aircraft from './Aircraft';

export default class Aircrafts extends Component {

  selectAircraft(e, data) {
    const newAircraft = this.props.aircrafts.find(aircraft => aircraft.aircraft.ident === data.ident);
    this.props.setAircraftChange(data, newAircraft.percentage, this.props.rotations.find(rotationObject => rotationObject.aircraft.ident === data.ident).rotation);
    NotificationManager.info('You are now looking at the rotation for the aircraft ' + data.ident + '.');
  }

  render() {
    return (
      <div className="aircrafts">
        Aircrafts
       <List>
       {
         this.props.aircrafts.map(d => {
          return (
            <Aircraft key={d.aircraft.ident} aircraft={d.aircraft} currentPercentage={d.percentage} selectAircraft={this.selectAircraft.bind(this)}/>)
         })
       }
       </List>
      </div>
    )
  }
}