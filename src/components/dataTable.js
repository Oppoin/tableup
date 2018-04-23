import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
} from 'material-ui/Table';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import { lighten } from 'material-ui/styles/colorManipulator';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import { InputAdornment } from 'material-ui/Input';
import SearchIcon from '@material-ui/icons/Search';


const columnData = [
  { id: 'id', numeric: true, disablePadding: false, label: 'Id' },
  { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'username', numeric: false, disablePadding: false, label: 'Username' },
  { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
  { id: 'phone', numeric: true, disablePadding: false, label: 'Phone' },
  { id: 'website', numeric: false, disablePadding: false, label: 'Website' },
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">

          </TableCell>
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
              >
                {column.label}
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
  formContainer: {
    flex: '1 2 100%'
  },
  textfield:{
    backgroundColor:lighten(theme.palette.primary.main, 0.15),
    padding: 2,
    margin: 0,
    borderRadius: 2,

  },
  textWhite: {
    color: '#fff'
  }
});

let EnhancedTableToolbar = props => {
  const {classes, searchEnabled } = props;

  const callSearchRequest = event => {
    const query = event.target.value;
    const {onSearchChange} = props;

    onSearchChange(query);
  }

  return (
    <AppBar position="static">
      <Toolbar
        className={classNames(classes.root)}
      >
        <Typography color="inherit" variant="title">TableUp</Typography>
        <div className={classes.spacer}></div>
        {searchEnabled ?
        <form className={classNames(classes.container, classes.formContainer)} noValidate autoComplete="off">
            <TextField
              id="search"
              type="search"
              placeholder="Search..."
              className={classNames(classes.textfield)}
              fullWidth={true}
              InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                
                style: {color: 'inherit'}
              }}
              onChange={callSearchRequest}
            />
          </form>
          :
          null }
      </Toolbar>
    </AppBar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class EnhancedTable extends React.Component {
  constructor(props, context) {
    super(props, context);

    let {options} = props;
    const defaultOptions = {
      paging: true, 
      rowsPerPageOptions: [2, 5, 10],
      rowsPerPage: 5,
      checkbox: true,
      search: true
    }

    options = Object.assign({}, defaultOptions, options);

    this.state = {
      order: 'asc',
      orderBy: 'id',
      selected: [],
      data: [],
      page: 0,
      ...options
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(json => this.setState({data:json}))
  }

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleSearch = query => {
    fetch(`https://jsonplaceholder.typicode.com/users/?q=${query}`)
    .then(response => response.json())
    .then(json => this.setState({data:json}))
  }

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page, paging, rowsPerPageOptions, checkbox } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar 
          numSelected={selected.length}
          onSearchChange={this.handleSearch}
          searchEnabled={this.state.search} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                const isSelected = this.isSelected(n.id);
                return (
                  <TableRow
                    hover
                    onClick={event => this.handleClick(event, n.id)}
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.id}
                    selected={isSelected}
                  >
                    <TableCell padding="checkbox">
                    {checkbox ? 
                      <Checkbox checked={isSelected} />
                    :
                    null }
                    </TableCell>
                    <TableCell numeric>{n.id}</TableCell>
                    <TableCell padding="none">{n.name}</TableCell>
                    <TableCell>{n.username}</TableCell>
                    <TableCell>{n.email}</TableCell>
                    <TableCell numeric>{n.phone}</TableCell>
                    <TableCell>{n.website}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={7} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        {paging ? 
        <TablePagination
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={rowsPerPageOptions}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
        :
        null }
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);