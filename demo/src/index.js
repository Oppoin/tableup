import React, {Component} from 'react';
import {render} from 'react-dom';

import {handleFetch} from './services/api.js';
import {apiUrl} from './constants.js';

import TableUp from '../../src';
import '../../css/tableup.css';

class Demo extends Component {
  state = {
    page: 1,
    filter: {
      username: '',
    },
    rowsPerPage: 5,
    data: [],
    total: 0,
  };

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    let url = apiUrl;
    // filter
    if (this.state.filter.username) {
      url = `${url}?filter{username.icontains}=${this.state.filter.username}&`;
    } else {
      url = `${url}?`;
    }
    // page
    url = `${url}page=${this.state.page}&`;
    // perPage
    url = `${url}per_page=${this.state.rowsPerPage}`;

    handleFetch(
      url,
      {},
      response => {
        this.setState({
          data: response.data,
          total: response.meta.pagination.count,
        });
      }
    );
  }

  handleQuerySeach = query => {
    this.setState({
      page: 1, // reset
      filter: {
        ...this.state.filter,
        username: query,
      },
    }, () => {
      this.loadData();
    });
  }

  handleChangePage = (e, page) => {
    this.setState({
      page,
    }, () => {
      this.loadData();
    });
  }

  handleChangeRowsPerPage = e => {
    this.setState({
      page: 1, // reset
      rowsPerPage: e.target.value,
    }, () => {
      this.loadData();
    });
  }

  handleDelete = selectedIds => {
    console.log('delete', selectedIds);
  }

  handleAdditionalAction = selectedIds => {
    console.log('additinal action', selectedIds);
  }

  render() {
    return (
      <div>
        <TableUp
          palette={{
            'type': 'dark', // ['light' | 'dark']
            'primary': {
              'main': '#470da0',
            },
            'secondary': {
              'main': '#72ff00',
            },
            // 'text': {
            //   'primary': 'rgba(0, 0, 0, 0.87)',
            //   'secondary': 'rgba(0, 0, 0, 0.54)',
            //   'disabled': 'rgba(0, 0, 0, 0.38)',
            //   'hint': 'rgba(0, 0, 0, 0.38)',
            // },
            // 'background': {
            //   'default': '#fafafa',
            // },
            // 'action': {
            //   'active': 'rgba(0, 0, 0, 0.54)',
            //   'hover': 'rgba(0, 0, 0, 0.08)',
            //   'hoverOpacity': 0.08,
            //   'selected': 'rgba(0, 0, 0, 0.14)',
            //   'disabled': 'rgba(0, 0, 0, 0.26)',
            //   'disabledBackground': 'rgba(0, 0, 0, 0.12)',
            // },
            // read more about material-ui palette here:
            // https://material-ui.com/customization/themes/#palette
          }}
          title="My table"
          data={{
            values: this.state.data,
            columns: [
              {
                key: 'attributes.username',
                label: 'Username',
              },
              {
                key: 'attributes.email',
                label: 'Email',
              },
              {
                key: 'attributes.age',
                numeric: true,
                label: 'Age',
              },
              {
                key: 'attributes.sex',
                label: 'Sex',
              },
              {
                key: 'attributes.address',
                label: 'Address',
              },
            ],
          }}
          selection={{
            enabled: true,
            handleDelete: this.handleDelete,
            additionalActions: [
              {
                label: 'First action',
                handle: this.handleAdditionalAction,
              },
              {
                label: 'Second action',
                handle: this.handleAdditionalAction,
              },
              {
                label: 'Third action',
                handle: this.handleAdditionalAction,
              },
            ],
          }}
          querySearch={{
            enabled: true,
            hintText: 'Search',
            debounceTime: 200,
            onSearch: this.handleQuerySeach,
          }}
          pagination={{
            enabled: true,
            page: this.state.page,
            startingPage: 1,
            total: this.state.total,
            rowsPerPage: this.state.rowsPerPage,
            rowsPerPageOptions: [5, 10, 20, 30],
            onChangePage: this.handleChangePage,
            onChangeRowsPerPage: this.handleChangeRowsPerPage,
          }}
        />
      </div>
    );
  }
}

render(<Demo/>, document.querySelector('#demo'));
