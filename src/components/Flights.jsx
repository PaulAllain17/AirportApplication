import React, { Component } from 'react';

import List from '@material-ui/core/List';
import Flight from './Flight.jsx';

export default class Flights extends Component {
  render() {
    return (
      <div className="flights">
      Flights:
       <List>
       {
         this.props.flights.map(d => {
          return (
            <Flight key={d.id} flight={d}></Flight>)
         })
       }
       </List>
      </div>
    )
  }
}
