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

class DataTableHeader extends React.Component {
  static propTypes = {
    selection: t.object,
    isAllSelected: t.bool.isRequired,
    columns: dataColumnsType.isRequired,
    onSelectAllClick: t.func.isRequired,
  };

  render() {
    const {
      selection,
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

export default DataTableHeader;
