import React from 'react';
import t from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

class DataTablePaginationActions extends React.Component {
  static propTypes = {
    page: t.number.isRequired,
    count: t.number.isRequired,
    rowsPerPage: t.number.isRequired,
    onChangePage: t.func.isRequired,
    classes: t.object.isRequired,
    theme: t.object.isRequired,
  };

  handleFirstPageButtonClick = e => {
    this.props.onChangePage(e, 0);
  };

  handleBackButtonClick = e => {
    this.props.onChangePage(e, this.props.page - 1);
  };

  handleNextButtonClick = e => {
    this.props.onChangePage(e, this.props.page + 1);
  };

  handleLastPageButtonClick = e => {
    this.props.onChangePage(
      e,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  render() {
    const {
      page,
      rowsPerPage,
      count,
      classes,
      theme,
    } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

export default withStyles(theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
}), {
  withTheme: true,
})(DataTablePaginationActions);
