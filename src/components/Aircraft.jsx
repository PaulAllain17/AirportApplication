import React, { Component } from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default class Aircraft extends Component {
  render() {
    return (
      <ListItem key={this.props.id} alignItems="flex-start">
            <ListItemText
              primary={this.props.aircraft.ident}
              secondary={
                <React.Fragment>
                  {this.props.aircraft.type}
                </React.Fragment>
              }
            />
          </ListItem>
    )
  }
}
