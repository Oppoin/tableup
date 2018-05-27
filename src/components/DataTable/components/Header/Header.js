import React from 'react';
import t from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

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
          variant="title"
          className={classes.title}
        >
          {title}
        </Typography>
      </div>
      <div className={classes.spacer}/>
      <div className={classes.actions}>
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
    color: theme.palette.common.white,
  },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  titleWrapper: {
    flex: '0 0 auto',
  },
  title: {
    color: theme.palette.common.white,
  },
}))(Header);
