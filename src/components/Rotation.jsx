import React, { Component } from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default class Rotation extends Component {
  render() {
    return (
      <ListItem key={this.props.id} alignItems="flex-start">
            <ListItemText
              primary={this.props.flight.id}
              secondary={
                <React.Fragment>
                  <tr>
                    <span className="flight-span">{this.props.flight.origin}</span>
                    <i class="arrow right"></i>
                    <span className="rotation-span">{this.props.flight.destination}</span>
                  </tr>
                  <tr>
                    <span className="flight-span">{this.props.flight.readable_departure}</span>
                    <span className="rotation-arrival-span">{this.props.flight.readable_arrival}</span>
                  </tr>
                </React.Fragment>
              }
            />
      </ListItem>
    )
  }
}
