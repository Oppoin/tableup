import React, {Component} from 'react';
import {render} from 'react-dom';

import {handleFetch} from './services/api.js';
import {apiUrl} from './constants.js';

import TableUp from '../../src';
import '../../css/tableup.css';

class Demo extends Component {
  state = {
    page: 1,
    perPage: 5,
    filter: {
      username: '',
    },
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
    url = `${url}per_page=${this.state.perPage}`;

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
      perPage: e.target.value,
    }, () => {
      this.loadData();
    });
  }

  render() {
    return (
      <div>
        <TableUp
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
            selectAll: true,
            onSelectedAction: () => {}, // TODO
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
            rowsPerPage: this.state.perPage,
            total: this.state.total,
            onChangePage: this.handleChangePage,
            rowsPerPageOptions: [5, 10, 20],
            onChangeRowsPerPage: this.handleChangeRowsPerPage,
          }}
        />
      </div>
    );
  }
}

render(<Demo/>, document.querySelector('#demo'));
