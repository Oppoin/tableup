import React from 'react';
import t from 'prop-types';
import {
  Table as MuiTable,
  TableBody as MuiTableBody,
  TableHeader as MuiTableHeader,
  TableHeaderColumn as MuiTableHeaderColumn,
  TableRow as MuiTableRow,
  TableRowColumn as MuiTableRowColumn,
  TableFooter as MuiTableFooter,
} from 'material-ui/Table';
import muiThemeable from 'material-ui/styles/muiThemeable';

import {
  dataArrayType,
} from '../../shapes.js';

import Header from './components/Header/Header.js';

const DataTable = ({
  data,
  onQuerySeach,
  querySearchDebounceTime,
  querySearchHintText,
  muiTheme,
}) => {
  return (
    <div className="tableup-table-wrapper">

      <MuiTable
        multiSelectable
      >
        {/* header */}
        <MuiTableHeader
          displaySelectAll={false}
        >
          <MuiTableRow style={{backgroundColor: muiTheme.palette.primary1Color}}>
            <MuiTableHeaderColumn colSpan={3} style={{textAlign: 'center'}}>
              <Header
                onQuerySeach={onQuerySeach}
                querySearchDebounceTime={querySearchDebounceTime}
                querySearchHintText={querySearchHintText}
              />
            </MuiTableHeaderColumn>
          </MuiTableRow>
          <MuiTableRow>
            <MuiTableHeaderColumn>ID</MuiTableHeaderColumn>
            <MuiTableHeaderColumn>Name</MuiTableHeaderColumn>
            <MuiTableHeaderColumn>Phone</MuiTableHeaderColumn>
          </MuiTableRow>
        </MuiTableHeader>

        {/* body */}
        <MuiTableBody
          showRowHover
          deselectOnClickaway={false}
        >
          {data.map(item =>
            <MuiTableRow key={item.id}>
              <MuiTableRowColumn>{item.id}</MuiTableRowColumn>
              <MuiTableRowColumn>{item.name}</MuiTableRowColumn>
              <MuiTableRowColumn>{item.phone}</MuiTableRowColumn>
            </MuiTableRow>
          )}
        </MuiTableBody>
      </MuiTable>
    </div>
  );
};

DataTable.propTypes = {
  data: dataArrayType.isRequired,
  onQuerySeach: t.func.isRequired,
  querySearchDebounceTime: t.number,
  querySearchHintText: t.string,
};

DataTable.defaultProps = {
  data: [],
  onQuerySeach: () => {},
  querySearchDebounceTime: 0,
  querySearchHintText: 'Search',
};

export default muiThemeable()(DataTable);
