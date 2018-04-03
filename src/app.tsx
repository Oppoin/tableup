import * as React from 'react';
import styled from 'styled-components';
import DataTable from './components/dataTable';

const AppContainer = styled.div`
`;

class App extends React.Component {
  render() {
    return (
      <AppContainer>
        <DataTable />
      </AppContainer>
    );
  }
}

export default App;
