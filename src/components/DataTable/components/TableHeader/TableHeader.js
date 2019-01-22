import React from 'react';
import t from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

import {
  dataColumnsType,
} from '../../../../shapes.js';

class TableHeader extends React.Component {
  static propTypes = {
    selectionEnabled: t.bool,
    numSelected: t.number,
    isAllSelected: t.bool.isRequired,
    columns: dataColumnsType.isRequired,
    onSelectAllClick: t.func.isRequired,
  };

  render() {
    const {
      selectionEnabled,
      numSelected,
      isAllSelected,
      columns,
      onSelectAllClick,
    } = this.props;

    return (
      <TableHead>
        <TableRow>
          {selectionEnabled &&
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={numSelected > 0 && !isAllSelected}
                checked={isAllSelected}
                onChange={onSelectAllClick}
              />
            </TableCell>
          }

          {columns.map((column, i) =>
            <TableCell
              key={column.key}
              numeric={column.numeric}
              padding={selectionEnabled && i === 0 ? 'none' : 'default'}
            >
              {column.label}
            </TableCell>
          )}
        </TableRow>
      </TableHead>
    );
  }
}

export default TableHeader;
