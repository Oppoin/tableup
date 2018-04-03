import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import './index.css';

const theme = createMuiTheme();

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App/>
  </MuiThemeProvider>,
  document.getElementById('root') as HTMLElement
);
