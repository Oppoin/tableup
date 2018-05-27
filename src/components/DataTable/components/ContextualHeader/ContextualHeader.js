import React from 'react';
import classNames from 'classnames';
import t from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Tooltip from 'material-ui/Tooltip';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import {lighten} from 'material-ui/styles/colorManipulator';

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
      <div className={classes.title}>
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
    display: 'flex',
  },
  title: {
    flex: '0 0 auto',
  },
}))(ContextualHeader);
