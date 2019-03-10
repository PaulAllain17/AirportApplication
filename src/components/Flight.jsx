import React, { Component } from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default class Flight extends Component {
  render() {
    return (
      <ListItem alignItems="flex-start">
            <ListItemText
              primary={this.props.flight.id}
              secondary={
                <React.Fragment>
                  {this.props.flight.id}
                </React.Fragment>
              }
            />
      </ListItem>
    )
  }
}
