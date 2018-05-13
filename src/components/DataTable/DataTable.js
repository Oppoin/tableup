import React from 'react';
import t from 'prop-types';
import get from 'lodash.get';
import {withStyles} from 'material-ui/styles';
import Table, {
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
} from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';

import {
  dataArrayType,
} from '../../shapes.js';

import DataTableHeader from './components/Header/DataTableHeader.js';
import DataTableToolbar from './components/Toolbar/DataTableToolbar.js';
import DataTablePaginationActions from './components/PaginationActions/DataTablePaginationActions.js';

class DataTable extends React.Component {
  isSelected = id => this.props.selected.indexOf(id) !== -1;

  render() {
    const {
      data,
      columns,
      title,
      selected,
      querySearchHintText,
      querySearchDebounceTime,
      page,
      count,
      rowsPerPage,
      handleSelectAllClick,
      handleClick,
      onQuerySeach,
      handleChangePage,
      handleChangeRowsPerPage,
      classes,
    } = this.props;

    return (
      <div>
        <DataTableToolbar
          title={title}
          numSelected={selected.length}
          querySearchHintText={querySearchHintText}
          querySearchDebounceTime={querySearchDebounceTime}
          onQuerySeach={onQuerySeach}
        />

        <div className={classes.tableWrapper}>
          <Table
            className={classes.table}
            aria-labelledby="datatable-title"
          >
            <DataTableHeader
              isAllSelected={data.length > 0 && selected.length === data.length}
              columns={columns}
              onSelectAllClick={handleSelectAllClick}
            />

            <TableBody>
              {data.map(item => {
                const isSelected = this.isSelected(item.id);
                return (
                  <TableRow
                    hover
                    onClick={e => handleClick(e, item.id)}
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={item.id}
                    selected={isSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox checked={isSelected}/>
                    </TableCell>
                    {columns.map((column, i) =>
                      <TableCell
                        key={column.key}
                        padding={i === 0 ? 'none' : 'default'}
                        numeric={column.numeric}
                      >{get(item, column.key)}</TableCell>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        <TablePagination
          component="div"
          page={page}
          count={count}
          rowsPerPage={rowsPerPage}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          ActionsComponent={DataTablePaginationActions}
        />
      </div>
    );
  }
}

DataTable.propTypes = {
  data: dataArrayType.isRequired,
  columns: t.array.isRequired,
  title: t.string,
  // onQuerySeach: t.func.isRequired,
  // querySearchDebounceTime: t.number,
  // querySearchHintText: t.string,
  classes: t.object.isRequired,
};

DataTable.defaultProps = {
  data: [],
  columns: [],
  title: '',
  // onQuerySeach: () => {},
  // querySearchDebounceTime: 0,
  // querySearchHintText: 'Search',
};

export default withStyles(theme => ({
  table: {
    // minWidth: 1020,
  },
  tableWrapper: {
    // overflowX: 'auto',
  },
}))(DataTable);
