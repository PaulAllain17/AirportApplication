import React, { Component } from 'react';

export default class Rotations extends Component {
  render() {
    return (
      <div className="rotations">
        { this.props.children }
      </div>
    )
  }
}
