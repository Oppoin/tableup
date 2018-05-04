import React, { Component } from 'react';
import EnhancedTable from './components/dataTable';

class App extends Component {
  render() {
    return (
      <EnhancedTable options={window.tableConfig} />
    );
  }
}

export default App;
