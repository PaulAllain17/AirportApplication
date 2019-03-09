import React, { Component } from 'react';

export default class Flights extends Component {
  render() {
    return (
      <div className="flights">
        { this.props.children }
      </div>
    )
  }
}
