import React, {Component} from 'react';
import {render} from 'react-dom';

import TableUp from '../../src';
import '../../css/tableup.css';

class Demo extends Component {
  state = {
    users: [],
  };

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(json => {
      this.setState({
        users: json
      })
    })
    .catch(ex => {
      console.error('parsing failed', ex);
    });
  }

  render() {
    return (
      <div>
        <TableUp
          data={this.state.users}
        />
      </div>
    );
  }
}

render(<Demo/>, document.querySelector('#demo'));
