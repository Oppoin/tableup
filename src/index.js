import React from 'react';
import t from 'prop-types';
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';

import {
  dataType,
} from './shapes.js';

import DataTable from './components/DataTable/DataTable.js';

class TableUp extends React.Component {
  static propTypes = {
    palette: t.object,
    title: t.string,
    data: dataType.isRequired,
    selection: t.object,
    querySearch: t.object,
    pagination: t.object,
  };

  static defaultProps = {
    palette: undefined,
    title: '',
    data: {
      values: [],
      columns: [],
    },
    selection: {
      enabled: true,
      handleDelete: undefined,
      additionalActions: [],
    },
    querySearch: {
      enabled: true,
      hintText: 'Search',
      debounceTime: 200,
      onSearch: () => {},
    },
    pagination: {
      enabled: true,
      page: 0,
      startingPage: 0,
      rowsPerPage: 5,
      total: 0,
      onChangePage: () => {},
      rowsPerPageOptions: [5, 10, 20],
      onChangeRowsPerPage: () => {},
    },
  };

  state = {
    selected: [],
  };

  theme = createMuiTheme({
    palette: this.props.palette,
  });

  handleSelectAllClick = (e, checked) => {
    this.setState({
      selected: checked ?
        this.props.data.values.map(item => item.id) : [],
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

    this.props.querySearch.onSearch(query);
  };

  handleChangePage = (e, page) => {
    // reset selected
    this.setState({
      selected: [],
    });

    this.props.pagination.onChangePage(e, page + this.props.pagination.startingPage);
  };

  handleChangeRowsPerPage = e => {
    // reset selected
    this.setState({
      selected: [],
    });

    this.props.pagination.onChangeRowsPerPage(e);
  }

  render() {
    const {
      palette,
      title,
      data,
      selection,
      querySearch,
      pagination,
      ...props
    } = this.props;

    return (
      <MuiThemeProvider theme={this.theme}>
        <div
          style={{
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          }}
          {...props}
        >
          <DataTable
            title={title}
            data={{
              ...TableUp.defaultProps.data,
              ...data,
            }}
            selection={{
              ...TableUp.defaultProps.selection,
              ...selection,
            }}
            querySearch={{
              ...TableUp.defaultProps.querySearch,
              ...querySearch,
            }}
            pagination={{
              ...TableUp.defaultProps.pagination,
              ...pagination,
            }}
            // ---
            selected={this.state.selected}
            page={
              pagination.enabled ?
                pagination.page - pagination.startingPage : 0
            }
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
