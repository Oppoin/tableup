import React from 'react';
import t from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Search from './components/Search/Search.js';

let Header = props => {
  const {
    title,
    querySearch,
    onQuerySeach,
    classes,
  } = props;

  return (
    <Toolbar className={classes.root}>
      <div className={classes.titleWrapper}>
        <Typography
          id="datatable-title"
          variant="h6"
          className={classes.h6}
        >{title}</Typography>
      </div>
      <div className={classes.spacer}/>
      <div>
        {querySearch.enabled &&
          <Search
            onQuerySeach={onQuerySeach}
            querySearchDebounceTime={querySearch.debounceTime}
            querySearchHintText={querySearch.hintText}
          />
        }
      </div>
    </Toolbar>
  );
};

Header.propTypes = {
  title: t.string,
  querySearch: t.object,
  onQuerySeach: t.func,
  classes: t.object.isRequired,
};

export default withStyles(theme => ({
  root: {
    backgroundColor: theme.palette.primary.main,
  },
  spacer: {
    flex: '1 1 100%',
  },
  titleWrapper: {
    flex: '0 0 auto',
  },
  h6: {
    color: theme.palette.text.primary,
  },
}))(Header);
