import React from 'react';
import t from 'prop-types';
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';

import {
  dataArrayType,
  dataColumnsType,
} from './shapes.js';

import DataTable from './components/DataTable/DataTable.js';

const theme = createMuiTheme();

class TableUp extends React.Component {
  static propTypes = {
    dataArray: dataArrayType.isRequired,
    dataColumns: dataColumnsType.isRequired,
    title: t.string,
    querySearchHintText: t.string,
    querySearchDebounceTime: t.number,
    onQuerySeach: t.func.isRequired,
    page: t.number.isRequired,
    startingPage: t.number.isRequired,
    rowsPerPage: t.number.isRequired,
    count: t.number.isRequired,
    onChangePage: t.func.isRequired,
    rowsPerPageOptions: t.arrayOf(t.number),
    onChangeRowsPerPage: t.func.isRequired,
  };

  static defaultProps = {
    dataArray: [],
    dataColumns: [],
    title: '',
    querySearchHintText: 'Search',
    querySearchDebounceTime: 0,
    onQuerySeach: () => {},
    page: 1,
    startingPage: 0,
    rowsPerPage: 5,
    count: 0,
    onChangePage: () => {},
    rowsPerPageOptions: [5, 10, 20],
    onChangeRowsPerPage: () => {},
  };

  state = {
    selected: [],
  };

  handleSelectAllClick = (e, checked) => {
    this.setState({
      selected: checked ?
        this.props.dataArray.map(item => item.id) : [],
    });
  };

  handleClick = (e, id) => {
    const {
      selected,
    } = this.state;

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

  handleQuerySeach = query => {
    // reset selected
    this.setState({
      selected: [],
    });

    this.props.onQuerySeach(query);
  };

  handleChangePage = (e, page) => {
    // reset selected
    this.setState({
      selected: [],
    });

    this.props.onChangePage(e, page + this.props.startingPage);
  };

  handleChangeRowsPerPage = e => {
    // reset selected
    this.setState({
      selected: [],
    });

    this.props.onChangeRowsPerPage(e);
  }

  render() {
    const {
      dataArray,
      dataColumns,
      title,
      onQuerySeach,
      querySearchHintText,
      querySearchDebounceTime,
      page,
      startingPage,
      rowsPerPage,
      count,
      onChangePage,
      rowsPerPageOptions,
      onChangeRowsPerPage,
      ...props
    } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <div
          style={{
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          }}
          {...props}
        >
          <DataTable
            data={dataArray}
            columns={dataColumns}
            title={title}
            selected={this.state.selected}
            querySearchHintText={querySearchHintText}
            querySearchDebounceTime={querySearchDebounceTime}
            page={page - startingPage}
            count={count}
            rowsPerPage={rowsPerPage}
            handleClick={this.handleClick}
            handleSelectAllClick={this.handleSelectAllClick}
            onQuerySeach={this.handleQuerySeach}
            handleChangePage={this.handleChangePage}
            handleChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default TableUp;
