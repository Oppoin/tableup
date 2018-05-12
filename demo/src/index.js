import React, {Component} from 'react';
import {render} from 'react-dom';

import {handleFetch} from './services/api.js';
import {apiUrl} from './constants.js';

import TableUp from '../../src';
import '../../css/tableup.css';

class Demo extends Component {
  state = {
    page: 1,
    perPage: 2,
    filter: {
      username: '',
    },
    data: [],
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
        });
      }
    );
  }

  handleQuerySeach = query => {
    this.setState({
      filter: {
        ...this.state.filter,
        username: query,
      },
    }, () => {
      this.loadData();
    });
  }

  render() {
    return (
      <div>
        <TableUp
          dataArray={this.state.data}
          onQuerySeach={this.handleQuerySeach}
          querySearchDebounceTime={200}
          querySearchHintText="Search"
        />
      </div>
    );
  }
}

render(<Demo/>, document.querySelector('#demo'));
