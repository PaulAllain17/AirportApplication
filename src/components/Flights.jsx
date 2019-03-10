import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
});

export default class Flights extends Component {
  constructor(props) {
		super(props);
		this.state = { data: [] };
	}
	componentWillMount() {
		const xhr = new XMLHttpRequest();
		xhr.open('get', this.props.url, true);
		xhr.onload = () => {
			const data = JSON.parse(xhr.responseText);
			this.setState({ data: data.data });
		};
		xhr.send();
	}
  render() {
    return (
      <div className="flights">
       <List>
       {
         this.state.data.map(d => {
          return (
            <ListItem alignItems="flex-start">
            <ListItemText
              primary={d.id}
              secondary={
                <React.Fragment>
                  {d.id}
                </React.Fragment>
              }
            />
          </ListItem>)
         })
       }
      
    </List>
      </div>
    )
  }
}
