import React, {Component} from 'react';
import {render} from 'react-dom';
// import $ from 'jquery';

import TableUp from '../../src';
import '../../css/tableup.css';

import {handleFetch} from './services/api.js';

// http://apiplaceholder.oppoin.com/users/?filter{username.icontains}=an&page=2&per_page=2
const apiUrl = 'http://apiplaceholder.oppoin.com/users/';

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

    // $.ajax({
    //   url: apiUrl,
    //   contentType: 'application/vnd.api+json'
    // })
    //   .done(function( data ) {
    //     console.log('data', data);
    //   });
  }

  loadData = () => {
    handleFetch(`${apiUrl}?filter{username.icontains}=${this.state.filter.username}&page=${this.state.page}&per_page=${this.state.perPage}`,
    {},
    response => {
      this.setState({
        data: response.data,
      });
    });
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
          data={this.state.users}
          onQuerySeach={this.handleQuerySeach}
          querySearchDebounceTime={200}
          querySearchHintText="Search"
        />
      </div>
    );
  }
}

render(<Demo/>, document.querySelector('#demo'));
