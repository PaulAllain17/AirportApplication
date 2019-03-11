import React, { Component } from 'react';

export default class Rotation extends Component {
  render() {
    return (
      <div className="rotation">
      Rotations:
        { this.props.children }
      </div>
    )
  }
}
