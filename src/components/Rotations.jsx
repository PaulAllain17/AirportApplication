import React, { Component } from 'react';

import List from '@material-ui/core/List';
import Rotation from './Rotation.jsx';

export default class Rotations extends Component {
  render() {
    return (
      <div className="rotations">
        Rotation {this.props.activeAircraft}
       <List>
       {
         this.props.rotations.map(d => {
          return (
            <Rotation key={d.id} rotation={d} removeRotation={this.props.removeRotation.bind(this)}></Rotation>)
         })
       }
       </List>
      </div>
    )
  }
}
