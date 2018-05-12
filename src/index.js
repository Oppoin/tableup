import React from 'react';
import t from 'prop-types';
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';

import {
  dataArrayType,
} from './shapes.js';

// import DataTable from './components/DataTable/DataTable.js';
import DataTable from './DataTable.js';

const theme = createMuiTheme();

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
      ...props
    } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <div
          style={{
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          }}
          {...props}
        >
          {/* <DataTable
            data={dataArray}
            onQuerySeach={this.handleQuerySeach}
            querySearchDebounceTime={querySearchDebounceTime}
            querySearchHintText={querySearchHintText}
          /> */}

          <DataTable/>

        </div>
      </MuiThemeProvider>
    );
  }
}

export default TableUp;
