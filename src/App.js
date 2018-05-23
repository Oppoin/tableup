import React, { Component } from 'react';
import EnhancedTable from './components/dataTable';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Api from './services/api';

const theme = createMuiTheme(window.themeConfig);

class App extends Component {
  constructor(props, context) {
    super(props, context);

    const defaultOptions = {
      paging: true,
      rowsPerPageOptions: [2, 5, 10],
      rowsPerPage: 5,
      checkbox: true,
      search: true
    }

    const options = Object.assign({}, defaultOptions, window.tableConfig);
    this.state = {
      data: [],
      count: 0,
      page: 0,
      query: '',
      ...options
    }
  }

  componentDidMount() {
    this.refreshRows()
  }

  updateData = (options) => {
    this.setState(options, () => {
      this.refreshRows()
    })
  }

  refreshRows = () => {
    const {rowsPerPage, page, query} = this.state
    const fetchOpts = {rowsPerPage, page, query}
    Api.getRows(fetchOpts)
    .then(json => {
      this.setState({data:json.data,
                     count: json.meta.pagination.count,
                    })
                  })
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <EnhancedTable  onUpdate={this.updateData}
                      {...this.state} />
      </MuiThemeProvider>
    );
  }
}

export default App;
