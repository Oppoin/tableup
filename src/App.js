import React, { Component } from 'react';
import EnhancedTable from './components/dataTable';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

const theme = createMuiTheme(window.themeConfig);

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <EnhancedTable options={window.tableConfig} />
      </MuiThemeProvider>
    );
  }
}

export default App;