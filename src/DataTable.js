import React from 'react';
import t from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Table, {
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
} from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';

import DataTableHead from './DataTableHead.js';
import DataTableToolbar from './DataTableToolbar.js';
import DataTablePaginationActions from './DataTablePaginationActions.js';

let counter = 0;
function createData(name, calories, fat, carbs, protein) {
  counter += 1;
  return { id: counter, name, calories, fat, carbs, protein };
}

class DataTable extends React.Component {
  static propTypes = {
    classes: t.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      selected: [],
      data: [
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Donut', 452, 25.0, 51, 4.9),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
        createData('Honeycomb', 408, 3.2, 87, 6.5),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Jelly Bean', 375, 0.0, 94, 0.0),
        createData('KitKat', 518, 26.0, 65, 7.0),
        createData('Lollipop', 392, 0.2, 98, 0.0),
        createData('Marshmallow', 318, 0, 81, 2.0),
        createData('Nougat', 360, 19.0, 9, 37.0),
        createData('Oreo', 437, 18.0, 63, 4.0),
      ],
      page: 0,
      rowsPerPage: 5,
    };
  }

  handleSelectAllClick = (event, checked) => {
    this.setState({
      selected: checked ?
        this.state.data.map(n => n.id) : [],
    });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({
      selected: newSelected,
    });
  };

  handleChangePage = (event, page) => {
    this.setState({
      page,
    });
  };

  handleChangeRowsPerPage = event => {
    this.setState({
      rowsPerPage: event.target.value,
    });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const {
      classes,
    } = this.props;
    const {
      data,
      selected,
      rowsPerPage,
      page,
    } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <div>
        <DataTableToolbar
          title="Table name"
          numSelected={selected.length}
        />

        <div className={classes.tableWrapper}>
          <Table
            className={classes.table}
            aria-labelledby="datatable-title"
          >
            <DataTableHead
              numSelected={selected.length}
              onSelectAllClick={this.handleSelectAllClick}
              rowCount={data.length}
            />

            <TableBody>
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                const isSelected = this.isSelected(n.id);
                return (
                  <TableRow
                    hover
                    onClick={event => this.handleClick(event, n.id)}
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.id}
                    selected={isSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox checked={isSelected}/>
                    </TableCell>
                    <TableCell padding="none">{n.name}</TableCell>
                    <TableCell numeric>{n.calories}</TableCell>
                    <TableCell numeric>{n.fat}</TableCell>
                    <TableCell numeric>{n.carbs}</TableCell>
                    <TableCell numeric>{n.protein}</TableCell>
                  </TableRow>
                );
              })}

              {emptyRows > 0 &&
                <TableRow style={{height: 49 * emptyRows}}>
                  <TableCell colSpan={6}/>
                </TableRow>
              }
            </TableBody>
          </Table>
        </div>

        <TablePagination
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
          ActionsComponent={DataTablePaginationActions}
        />
      </div>
    );
  }
}

export default withStyles(theme => ({
  table: {
    // minWidth: 1020,
  },
  tableWrapper: {
    // overflowX: 'auto',
  },
}))(DataTable);
