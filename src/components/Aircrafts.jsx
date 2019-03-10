import React, { Component } from 'react';

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

export default class Aircrafts extends Component {
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
      <div data={this.state.data} className="aircrafts">
       <List>
       {
         this.state.data.map(d => {
          return (
            <ListItem alignItems="flex-start">
            <ListItemText
              primary={d.ident}
              secondary={
                <React.Fragment>
                  {d.ident}
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