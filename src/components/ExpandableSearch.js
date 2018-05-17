import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import './ExpandableSearch.css';

const styles = theme => ({
    formContainer: {
        flex: '1 2 100%'
    },
    underline: {
        color: '#fff',
        '&:before': {
            backgroundColor: 'rgba(255, 255, 255, 0.42)',
        },
        '&:after': {
            backgroundColor: '#fff',
        },
        '&:hover:not(.disabled):before': {
            backgroundColor: '#fff',
        },
    }

})

class ExpandableSearch extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        toggled: false
      }
    }

    handleSearchClick = e => {
        const {toggled} = this.state;
        const {handleSearch} = this.props;
        if (!toggled) {
            this.setState({toggled: true});
        } else {
            handleSearch(this.searchField.value)
        }
        
        this.searchField.focus();
    }

    handleCloseClick = e => {
        this.setState({toggled: false});
        this.searchField.blur();
    }

    handleSubmit = e => {
        e.preventDefault();
        const {handleSearch} = this.props;
        handleSearch(this.searchField.value)
    }

    render() {
        const {toggled} = this.state;
        const { classes } = this.props;

        return (<div className={classNames('search-container', toggled ? 'toggled' : null)}>
            <form className={classNames(classes.container, classes.formContainer)} 
                    noValidate 
                    autoComplete="off"
                    onSubmit={this.handleSubmit}>
            <SearchIcon onClick={this.handleSearchClick}
                        className={'search-icon'}/>
            
            <TextField
              id="search"
              type="text"
              placeholder="Search..."
              
              fullWidth={true}
              InputProps={{
                //style: {color: 'inherit'}
                className: classNames(classes.underline,)
              }}
              inputRef={el => {this.searchField = el}}
              //onChange={callSearchRequest}
            />
            {toggled ? 
            <CloseIcon onClick={this.handleCloseClick}
                        className={'close-icon'} />
            :
            null}
            </form>
        </div>)
            
    }

}

ExpandableSearch.propTypes = {
    handleSearch: PropTypes.func.isRequired
}

export default withStyles(styles)(ExpandableSearch);