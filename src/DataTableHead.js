import React from 'react';
import t from 'prop-types';
import {
  TableCell,
  TableHead,
  TableRow,
} from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';

const columnData = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Dessert (100g serving)' },
  { id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
  { id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
  { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
  { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
];

class DataTableHead extends React.Component {
  static propTypes = {
    numSelected: t.number.isRequired,
    onSelectAllClick: t.func.isRequired,
    rowCount: t.number.isRequired,
  };

  render() {
    const {
      onSelectAllClick,
      numSelected,
      rowCount,
    } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>

          {columnData.map(column =>
            <TableCell
              key={column.id}
              numeric={column.numeric}
              padding={column.disablePadding ? 'none' : 'default'}
            >
              {column.label}
            </TableCell>
          )}
        </TableRow>
      </TableHead>
    );
  }
}

export default DataTableHead;
