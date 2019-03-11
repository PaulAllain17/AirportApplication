import React, { Component } from 'react';

import List from '@material-ui/core/List';
import Rotation from './Rotation.jsx';

export default class Rotations extends Component {
  render() {
    return (
      <div className="rotations">
        Rotations:
       <List>
       {
         this.props.rotations.map(d => {
          return (
            <Rotation key={d.id} flight={d}></Rotation>)
         })
       }
       </List>
      </div>
    )
  }
}
