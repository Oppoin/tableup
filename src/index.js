import React, {Component} from 'react';
import t from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {
  DataTableData,
} from './shapes.js';

import {
  DataTable,
} from './components';

class TableUp extends Component {
  static propTypes = {
    data: DataTableData,
  };

  static defaultProps = {
    data: [],
  };

  render() {
    const {
      data,
      ...props,
    } = this.props;

    return (
      <MuiThemeProvider>
        <div className="tableup-wrapper" {...props}>

          <DataTable
            data={data}
          />

        </div>
      </MuiThemeProvider>
    );
  }
}

export default TableUp;
