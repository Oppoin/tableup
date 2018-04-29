import React from 'react';
import t from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {
  DataTableData,
} from './shapes.js';

import DataTable from './components/DataTable/DataTable.js';

class TableUp extends React.Component {
  static propTypes = {
    data: DataTableData,
    onQuerySeach: t.func.isRequired,
    querySearchDebounceTime: t.number,
    querySearchHintText: t.string,
  };

  static defaultProps = {
    data: [],
    onQuerySeach: () => {},
    querySearchDebounceTime: 0,
    querySearchHintText: 'Search',
  };

  render() {
    const {
      data,
      onQuerySeach,
      querySearchDebounceTime,
      querySearchHintText,
      ...props,
    } = this.props;

    return (
      <MuiThemeProvider>
        <div
          style={{
            fontFamily: 'Roboto, sans-serif'
          }}
          {...props}
        >

          <DataTable
            data={data}
            onQuerySeach={onQuerySeach}
            querySearchDebounceTime={querySearchDebounceTime}
            querySearchHintText={querySearchHintText}
          />

        </div>
      </MuiThemeProvider>
    );
  }
}

export default TableUp;
