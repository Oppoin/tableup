import React from 'react';
import t from 'prop-types';
import {
  TableCell,
  TableHead,
  TableRow,
} from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';

class DataTableHeader extends React.Component {
  static propTypes = {
    isAllSelected: t.bool.isRequired,
    // columns: t.array.isRequired,
    onSelectAllClick: t.func.isRequired,
  };

  render() {
    const {
      isAllSelected,
      columns,
      onSelectAllClick,
    } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              checked={isAllSelected}
              onChange={onSelectAllClick}
            />
          </TableCell>

          {columns.map((column, i) =>
            <TableCell
              key={column.key}
              numeric={column.numeric}
              padding={i === 0 ? 'none' : 'default'}
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
