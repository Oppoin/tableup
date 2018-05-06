import React from 'react';
import t from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {
  dataArrayType,
} from './shapes.js';

import DataTable from './components/DataTable/DataTable.js';

// Please proceed with MS3 but this time do include the pagination and use the endpoint I created where there is pagination metadata

class TableUp extends React.Component {
  static propTypes = {
    dataArray: dataArrayType.isRequired,
    onQuerySeach: t.func.isRequired,
    querySearchDebounceTime: t.number,
    querySearchHintText: t.string,
  };

  static defaultProps = {
    querySearchDebounceTime: 0,
    querySearchHintText: 'Search',
  };

  render() {
    const {
      dataArray,
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
            data={dataArray}
            onQuerySeach={this.handleQuerySeach}
            querySearchDebounceTime={querySearchDebounceTime}
            querySearchHintText={querySearchHintText}
          />

        </div>
      </MuiThemeProvider>
    );
  }
}

export default TableUp;
