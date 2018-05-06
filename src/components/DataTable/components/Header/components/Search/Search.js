import React from 'react';
import t from 'prop-types';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import ActionSearchIcon from 'material-ui/svg-icons/action/search';
import ContentClearIcon from 'material-ui/svg-icons/content/clear';
import muiThemeable from 'material-ui/styles/muiThemeable';
import debounce from 'lodash.debounce';

class Search extends React.Component {
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
    const {
      querySearchDebounceTime,
    } = this.props;

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
      onQuerySeach,
      querySearchHintText,
      muiTheme,
    } = this.props;

    return (
      <div style={{
        display: 'flex',
        alignItems: 'center'
      }}>
        <ActionSearchIcon
          style={{
            color: muiTheme.palette.alternateTextColor,
            marginRight: 4,
          }}
        />
        <TextField
          hintText={querySearchHintText}
          value={this.state.value}
          onChange={this.handleChange}
          style={{
            textAlign: 'left',
          }}
          underlineStyle={{
            borderColor: muiTheme.palette.alternateTextColor,
          }}
          underlineFocusStyle={{
            border: 'none',
          }}
          hintStyle={{
            color: 'rgba(240, 240, 240, .6)',
          }}
          inputStyle={{
            width: 230,
            color: muiTheme.palette.alternateTextColor,
          }}
        />
        {this.state.value.length > 0 &&
          <IconButton
            onClick={this.handleClear}
            style={{
              position: 'absolute',
              right: 8,
              zIndex: 2,
            }}
            iconStyle={{
              color: muiTheme.palette.alternateTextColor,
            }}
          >
            <ContentClearIcon/>
          </IconButton>
        }
      </div>
    );
  }
}

export default muiThemeable()(Search);
