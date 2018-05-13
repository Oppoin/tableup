import React from 'react';
import t from 'prop-types';
import TextField from 'material-ui/TextField';
import {InputAdornment} from 'material-ui/Input';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import {withStyles} from 'material-ui/styles';
import debounce from 'lodash.debounce';

class DataTableToolbarSearch extends React.Component {
  static propTypes = {
    onQuerySeach: t.func.isRequired,
    querySearchDebounceTime: t.number,
    querySearchHintText: t.string,
  };

  static defaultProps = {
    onQuerySeach: () => {},
    querySearchDebounceTime: 0,
    querySearchHintText: 'Search',
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
        <TextField
          label={querySearchHintText}
          margin="none"
          value={this.state.value}
          onChange={this.handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <ClearIcon
                  className={classes.clearButton}
                  style={{
                    visibility: this.state.value.length === 0 ? 'hidden' : 'visible',
                  }}
                  onClick={this.handleClear}
                />
              </InputAdornment>
            ),
          }}
        />
      </div>
    );
  }
}

export default withStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  searchIcon: {
    marginRight: 4,
    marginTop: 14,
  },
  clearButton: {
    cursor: 'pointer',
  },
}))(DataTableToolbarSearch);
