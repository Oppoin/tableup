import React, { Component } from 'react';
import EnhancedTable from './components/dataTable';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import {BASE_URL} from './constants';

const theme = createMuiTheme(window.themeConfig);

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      data: [],
      rowsPerPage: 5,
      count: 5
    }
  }

  componentDidMount() {
    const {rowsPerPage} = this.state;

    fetch(`${BASE_URL}?per_page=${rowsPerPage}`, {
      headers: new Headers({
        'Content-Type' : 'application/vnd.api+json'
      })
    })
    .then(response => response.json())
    .then(json => this.setState({data: json.data, count:json.meta.pagination.count}))
  }
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <EnhancedTable options={window.tableConfig}
                      data={this.state.data}
                      count={this.state.count} />
      </MuiThemeProvider>
    );
  }
}

export default App;
