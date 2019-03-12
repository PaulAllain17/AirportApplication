import React, { Component } from 'react';

import List from '@material-ui/core/List';
import Aircraft from './Aircraft';

export default class Aircrafts extends Component {
  render() {
    return (
      <div className="aircrafts">
        Aircrafts
       <List>
       {
         this.props.aircrafts.map(d => {
          return (
            <Aircraft key={d.aircraft.ident} aircraft={d.aircraft} currentPercentage={d.percentage} selectAircraft={this.props.selectAircraft.bind(this)}/>)
         })
       }
       </List>
      </div>
    )
  }
}