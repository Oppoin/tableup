import React from 'react';
import t from 'prop-types';
import {
  TableCell,
  TableHead,
  TableRow,
} from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';

import {
  dataColumnsType,
} from '../../../../shapes.js';

class TableHeader extends React.Component {
  static propTypes = {
    selection: t.object,
    numSelected: t.number,
    isAllSelected: t.bool.isRequired,
    columns: dataColumnsType.isRequired,
    onSelectAllClick: t.func.isRequired,
  };

  render() {
    const {
      selection,
      numSelected,
      isAllSelected,
      columns,
      onSelectAllClick,
    } = this.props;

    return (
      <TableHead>
        <TableRow>
          {selection.enabled &&
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
              padding={selection.enabled && i === 0 ? 'none' : 'default'}
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
