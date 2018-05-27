import React from 'react';
import classNames from 'classnames';
import t from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Tooltip from 'material-ui/Tooltip';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
// import FilterListIcon from '@material-ui/icons/FilterList';
import {lighten} from 'material-ui/styles/colorManipulator';

let ContextualHeader = props => {
  const {
    title,
    numSelected,
    classes,
  } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ?
          <Typography color="inherit" variant="subheading">
            {numSelected} selected
          </Typography>
          :
          <Typography variant="title" id="datatable-title">
            {title}
          </Typography>
        }
      </div>
      <div className={classes.spacer}/>
      <div className={classes.actions}>
        {numSelected > 0 &&
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              <DeleteIcon/>
            </IconButton>
          </Tooltip>
        }
      </div>
    </Toolbar>
  );
};

ContextualHeader.propTypes = {
  title: t.string,
  numSelected: t.number.isRequired,
  querySearch: t.object,
  onQuerySeach: t.func,
  classes: t.object.isRequired,
};

export default withStyles(theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight: theme.palette.type === 'light' ?
    {
      color: theme.palette.secondary.main,
      backgroundColor: lighten(theme.palette.secondary.light, 0.85),
    }
    :
    {
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
}))(ContextualHeader);
