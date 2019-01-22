import React from 'react';
import t from 'prop-types';
import get from 'lodash.get';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

import {
  dataType,
} from '../../shapes.js';

import Header from './components/Header/Header.js';
import ContextualHeader from './components/ContextualHeader/ContextualHeader.js';
import TableHeader from './components/TableHeader/TableHeader.js';
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
        <Header
          title={title}
          querySearch={querySearch}
          onQuerySeach={onQuerySeach}
        />

        {selected.length > 0 &&
          <ContextualHeader
            selection={selection}
            selected={selected}
          />
        }

        <div>
          <Table
            aria-labelledby="datatable-title"
            style={{
              tableLayout: 'fixed',
              wordWrap: 'break-word',
              overflow: 'hidden',
            }}
          >
            <TableHeader
              selectionEnabled={selection.enabled}
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
                          align={column.numeric ? 'right' : 'inherit'}
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
