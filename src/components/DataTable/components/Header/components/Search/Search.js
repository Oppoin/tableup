import React from 'react';
import t from 'prop-types';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import {withStyles} from '@material-ui/core/styles/withStyles';
import debounce from 'lodash.debounce';

class Search extends React.Component {
  static propTypes = {
    onQuerySeach: t.func.isRequired,
    querySearchDebounceTime: t.number,
    querySearchHintText: t.string,
  };

  state = {
    value: '',
  };

  componentDidMount() {
    this.debouncedSaveQuery = debounce(this.saveQuery, this.props.querySearchDebounceTime);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.querySearchDebounceTime !== prevProps.querySearchDebounceTime) {
      this.debouncedSaveQuery = debounce(this.saveQuery, this.props.querySearchDebounceTime);
    }
  }

  handleChange = e => {
    const value = e.target.value;

    this.setState({
      value,
    });
    this.debouncedSaveQuery(value);
  };

  handleClear = e => {
    this.setState({
      value: '',
    });
    this.saveQuery('');
  };

  saveQuery = query => {
    const {
      onQuerySeach,
    } = this.props;

    onQuerySeach(query);
  };

  render() {
    const {
      querySearchHintText,
      classes,
    } = this.props;

    return (
      <div className={classes.root}>
        <SearchIcon className={classes.searchIcon}/>
        <Input
          placeholder={querySearchHintText}
          margin="none"
          value={this.state.value}
          onChange={this.handleChange}
          classes={{
            root: classes.inputRoot,
            underline: classes.inputUnderline,
          }}
          endAdornment={(
            <InputAdornment position="end">
              <ClearIcon
                className={classes.clearButton}
                style={{
                  visibility: this.state.value.length === 0 ? 'hidden' : 'visible',
                }}
                onClick={this.handleClear}
              />
            </InputAdornment>
          )}
        />
      </div>
    );
  }
}

export default withStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.text.primary,
  },
  inputRoot: {
    color: theme.palette.text.primary,
  },
  inputUnderline: {
    '&:before': {
      backgroundColor: `${theme.palette.text.primary} !important`,
    },
    '&:after': {
      backgroundColor: theme.palette.text.primary,
    },
  },
  searchIcon: {
    marginRight: 4,
  },
  clearButton: {
    cursor: 'pointer',
  },
}))(Search);
