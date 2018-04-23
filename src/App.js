import React, { Component } from 'react';
import EnhancedTable from './components/dataTable';
import tableConfig from './config/tableConfig';

class App extends Component {
  render() {
    return (
      <EnhancedTable options={tableConfig} />
    );
  }
}

export default App;
