import React from 'react';
import classNames from 'classnames';
import t from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import Menu from './components/Menu/Menu.js';

let ContextualHeader = props => {
  const {
    selection,
    selected,
    classes,
  } = props;

  return (
    <Toolbar
      className={classNames(classes.root, classes.highlight)}
    >
      <div className={classes.h6}>
        <Typography color="inherit" variant="subheading">
          {selected.length} selected
        </Typography>
      </div>
      <div className={classes.spacer}/>
      <div className={classes.actions}>
        {selection.additionalActions.length > 0 &&
          <Menu
            actions={selection.additionalActions}
            selected={selected}
          />
        }

        {selection.handleDelete &&
          <Tooltip title="Delete">
            <IconButton
              aria-label="Delete"
              onClick={() => selection.handleDelete(selected)}
            >
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
  selected: t.array.isRequired,
  classes: t.object.isRequired,
};

export default withStyles(theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight: theme.palette.type === 'light' ?
    {
      color: theme.palette.secondary.main,
      backgroundColor: theme.palette.secondary.light,
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
    display: 'flex',
  },
  h6: {
    flex: '0 0 auto',
  },
}))(ContextualHeader);
