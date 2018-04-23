import React, {Component} from 'react';
import {render} from 'react-dom';

import TableUp from '../../src';
import '../../css/tableup.css';

import _data from './_data.js';

class Demo extends Component {
  render() {
    return (
      <div>
        <TableUp
          data={_data}
        />
      </div>
    );
  }
}

render(<Demo/>, document.querySelector('#demo'));
