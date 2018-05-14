import React from 'react';
import t from 'prop-types';
import get from 'lodash.get';
import Table, {
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
} from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';

import {
  dataType,
} from '../../shapes.js';

import DataTableHeader from './components/Header/DataTableHeader.js';
import DataTableToolbar from './components/Toolbar/DataTableToolbar.js';
import DataTablePaginationActions from './components/PaginationActions/DataTablePaginationActions.js';

class DataTable extends React.Component {
  isSelected = id => this.props.selected.indexOf(id) !== -1;

  render() {
    const {
      title,
      data,
      selection,
      querySearch,
      pagination,
      selected,
      page,
      handleClick,
      handleSelectAllClick,
      onQuerySeach,
      handleChangePage,
      handleChangeRowsPerPage,
    } = this.props;

    return (
      <div>
        <DataTableToolbar
          title={title}
          numSelected={selected.length}
          querySearch={querySearch}
          onQuerySeach={onQuerySeach}
        />

        <div>
          <Table
            aria-labelledby="datatable-title"
          >
            <DataTableHeader
              selection={selection}
              numSelected={selected.length}
              isAllSelected={data.values.length > 0 && selected.length === data.values.length}
              columns={data.columns}
              onSelectAllClick={handleSelectAllClick}
            />

            <TableBody>
              {data.values.map(item => {
                const isSelected = this.isSelected(item.id);

                if (selection.enabled) {
                  return (
                    <TableRow
                      key={item.id}
                      hover
                      onClick={e => handleClick(e, item.id)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected}/>
                      </TableCell>
                      {data.columns.map((column, i) =>
                        <TableCell
                          key={column.key}
                          padding={i === 0 ? 'none' : 'default'}
                          numeric={column.numeric}
                        >{get(item, column.key)}</TableCell>
                      )}
                    </TableRow>
                  );
                }
                return (
                  <TableRow
                    key={item.id}
                    hover
                  >
                    {data.columns.map((column, i) =>
                      <TableCell
                        key={column.key}
                        numeric={column.numeric}
                      >{get(item, column.key)}</TableCell>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {pagination.enabled &&
          <TablePagination
            component="div"
            page={page}
            count={pagination.total}
            rowsPerPage={pagination.rowsPerPage}
            rowsPerPageOptions={pagination.rowsPerPageOptions}
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
        }
      </div>
    );
  }
}

DataTable.propTypes = {
  title: t.string,
  data: dataType.isRequired,
  selection: t.object,
  querySearch: t.object,
  pagination: t.object,
  selected: t.array,
  page: t.number,
  handleClick: t.func,
  handleSelectAllClick: t.func,
  onQuerySeach: t.func,
  handleChangePage: t.func,
  handleChangeRowsPerPage: t.func,
};

export default DataTable;
