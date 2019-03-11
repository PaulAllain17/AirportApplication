import React, { Component } from 'react';

import List from '@material-ui/core/List';
import RotationFlight from './RotationFlight.jsx';

export default class Rotation extends Component {
  render() {
    return (
      <div className="rotations">
        Rotation {this.props.activeAircraft}
       <List>
       {
         this.props.rotation.map(d => {
          return (
            <RotationFlight key={d.id} rotationFlight={d} removeRotationFlight={this.props.removeRotationFlight.bind(this)}/>)
         })
       }
       </List>
      </div>
    )
  }
}
