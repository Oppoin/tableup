import React from 'react';
import t from 'prop-types';
import {
  Table as MuiTable,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import {
  DataTableData
} from '../shapes.js';

const DataTable = ({data}) => {
  return (
    <MuiTable
      multiSelectable
    >
      <TableHeader
        displaySelectAll={false}
      >
        <TableRow>
          <TableHeaderColumn>ID</TableHeaderColumn>
          <TableHeaderColumn>Name</TableHeaderColumn>
          <TableHeaderColumn>Status</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody
        showRowHover
        deselectOnClickaway={false}
      >

        {data.map(item =>
          <TableRow key={item.id}>
            <TableRowColumn>{item.id}</TableRowColumn>
            <TableRowColumn>{item.name}</TableRowColumn>
            <TableRowColumn>{item.status}</TableRowColumn>
          </TableRow>
        )}

      </TableBody>
    </MuiTable>
  );
};

DataTable.propTypes = {
  data: DataTableData,
};

DataTable.defaultProps = {
  data: [],
};

export default DataTable;
