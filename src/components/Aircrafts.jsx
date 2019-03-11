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
            <Aircraft key={d.ident} aircraft={d}></Aircraft>)
         })
       }
       </List>
      </div>
    )
  }
}