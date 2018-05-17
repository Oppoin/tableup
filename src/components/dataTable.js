import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-fetch';
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
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown'
import IconButton from 'material-ui/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandableSearch from './ExpandableSearch';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {BASE_URL} from '../constants';


const columnData = [
  { id: 'id', numeric: true, disablePadding: false, label: 'Id' },
  { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'username', numeric: false, disablePadding: false, label: 'Username' },
  { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
  { id: 'phone', numeric: true, disablePadding: false, label: 'Phone' },
  { id: 'website', numeric: false, disablePadding: false, label: 'Website' },
  { id: 'id7', numeric: false, disablePadding: false, label: 'Column 7' }, // added some empty columns to test table width with scrollbar
  { id: 'id8', numeric: false, disablePadding: false, label: 'Column 8' },
  { id: 'id9', numeric: false, disablePadding: false, label: 'Column 9' },
  { id: 'id10', numeric: false, disablePadding: false, label: 'Column 10' },
];

class EnhancedTableHead extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menuOpen: false
    }
  }
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  handleMenuClick = event => {
    this.setState({ menuOpen: !this.state.menuOpen });
  };

  handleMenuClose = () => {
      this.setState({ menuOpen: false });
  };

  handleMenuItemClick = (event, checked) => {
    const {onSelectAllClick} = this.props;
    onSelectAllClick(event, checked);
    this.setState({ menuOpen: false });
  }

  render() {
    const {menuOpen} = this.state;
    const {numSelected, rowCount, onSelectAllClick} = this.props;
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="none">
            <div>
              <Button
                onClick={this.handleMenuClick}
                buttonRef={node => {
                  this.anchorEl = node;
                }}
                style={{paddingLeft: 12}}
              >
                <Checkbox indeterminate={numSelected > 0 && numSelected < rowCount}
                          checked={numSelected > 0 && numSelected === rowCount}
                          onClick={onSelectAllClick} />
                <KeyboardArrowDown />
              </Button>

              <Menu
                id="simple-menu"
                anchorEl={this.anchorEl}
                open={menuOpen}
                onClose={this.handleMenuClose}
                anchorOrigin={{vertical: 'bottom'}}
                getContentAnchorEl={null}
              >
                <MenuItem onClick={e => {this.handleMenuItemClick(e, true)}}>All</MenuItem>
                <MenuItem onClick={e => {this.handleMenuItemClick(e, false)}}>None</MenuItem>
              </Menu>
            </div>
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
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit,
  },
  highlight:
   // theme.palette.type === 'light'
       {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        },
      //: {
          //color: theme.palette.text.primary,
          //backgroundColor: theme.palette.secondary.dark,
      //  },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    display: 'flex',
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
  textWhite: {
    color: '#fff'
  }
});

class EnhancedTableToolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rightMenuOpen: false
    }
  }

  handleMenuClick = () => {
    this.setState({rightMenuOpen: !this.state.rightMenuOpen})
  }

  handleMenuClose = () => {
    this.setState({ rightMenuOpen: false });
  };

  handleMenuItemClick = (event) => {
    this.setState({ rightMenuOpen: false });
  }

  render() {
    const {rightMenuOpen} = this.state;
    const {classes, searchEnabled, numSelected, handleSearch } = this.props;

    return (
      <div>
      <AppBar position="static">
        <Toolbar
          className={classNames(classes.root)}
        >
          <Typography color="inherit" variant="title">TableUp</Typography>
          <div className={classes.spacer}></div>
          {searchEnabled ?
            <ExpandableSearch handleSearch={handleSearch}/>
            :
          null }
        </Toolbar>
      </AppBar>
      <Toolbar
        className={classNames(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        <div className={classes.title}>
          {numSelected > 0 ? (
            <Typography color="inherit" variant="subheading">
              {numSelected} selected
            </Typography>
          ) : (
            <Typography variant="title">Users</Typography>
          )}
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          {numSelected > 0 ? (
              <IconButton aria-label="Delete">
                <DeleteIcon />
              </IconButton>
          ) : null}
          <IconButton 
            aria-label="More"
            onClick={this.handleMenuClick}
            buttonRef={(el) => {this.moreVertIconEl = el}}>
                <MoreVertIcon />
          </IconButton>
  
          <Menu
              id="right-menu"
              anchorEl={this.moreVertIconEl}
              open={rightMenuOpen}
              onClose={this.handleMenuClose}
              anchorOrigin={{vertical: 'bottom'}}
              getContentAnchorEl={null}
            >
            <MenuItem onClick={this.handleMenuItemClick}>Item 1</MenuItem>
            <MenuItem onClick={this.handleMenuItemClick}>Item 2</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </div>
    );
  }
} 

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
  }
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
      menuOpen: false,
      order: 'asc',
      orderBy: 'id',
      selected: [],
      data: [],
      page: 0,
      count: 10,
      query: '',
      ...options
    };
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
    const {rowsPerPage, query} = this.state;

    fetch(`${BASE_URL}?page=${page + 1}&per_page=${rowsPerPage}&filter{username.icontains}=${query}`, {
      headers: new Headers({
        'Content-Type' : 'application/vnd.api+json'
      })
    })
    .then(response => response.json())
    .then(json => {
      this.setState({data:json.data,
                    page,
                    selected: [] })
      })

  };

  handleChangeRowsPerPage = event => {
    const page = 0,
          rowsPerPage = event.target.value,
          {query} = this.state;
    fetch(`${BASE_URL}?page=${page + 1}&per_page=${rowsPerPage}&filter{username.icontains}=${query}`, {
      headers: new Headers({
        'Content-Type' : 'application/vnd.api+json'
      })
    })
    .then(response => response.json())
    .then(json => {
      this.setState({data:json.data,
                    count:json.meta.pagination.count,
                    page,
                    rowsPerPage,
                    selected: [] })
      })
  };

  handleSearch = query => {
    const {rowsPerPage} = this.state;

    fetch(`${BASE_URL}?filter{username.icontains}=${query}&per_page=${rowsPerPage}`, {
      headers: new Headers({
        'Content-Type' : 'application/vnd.api+json'
      })
    })
    .then(response => response.json())
    .then(json => this.setState({data: json.data, 
                                count:json.meta.pagination.count,
                                query,
                                selected: []}))
  }

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  handleSelectAllClick = (event, checked) => {
    event.stopPropagation();
    checked = checked || event.target.checked;
    if (checked) {
      this.setState({ selected: this.state.data.map(n => n.id) });
      return;
    }
    this.setState({ selected: [] });
  };

  handleAllBtnClick = () => {
    this.setState({ selected: this.state.data.map(n => n.id),
                    menuOpen: false});
  }

  handleNoneBtnClick = () => {
    this.setState({ selected: [],
                    menuOpen: false });
  }

  handleDeleteClick = () => {
    const {selected} = this.state;
    alert('These items will be deleted: ' + selected);
  }

  render() {
    const { classes } = this.props;
    const { data, selected, rowsPerPage, page, paging, rowsPerPageOptions, checkbox, count } = this.state;
    const emptyRows = rowsPerPage - data.length;

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          handleSearch={this.handleSearch}
          searchEnabled={this.state.search} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <EnhancedTableHead
              numSelected={selected.length}
              rowCount={data.length}
              onSelectAllClick={this.handleSelectAllClick}
            />
            <TableBody>
              {data.map(n => {
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
                    <TableCell>{n.attributes.username}</TableCell>
                    <TableCell>{n.attributes.email}</TableCell>
                    <TableCell numeric>{n.phone}</TableCell>
                    <TableCell>{n.website}</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={11} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        {paging ?
        <TablePagination
          component="div"
          count={count}
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
