import React from 'react';
import t from 'prop-types';
import IconButton from 'material-ui/IconButton';
import MuiMenu, {MenuItem} from 'material-ui/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';

class Menu extends React.Component {
  static propTypes = {
    actions: t.array.isRequired,
    selected: t.array.isRequired,
  };

  state = {
    anchorEl: null,
  };

  handleOpen = e => {
    this.setState({
      anchorEl: e.currentTarget,
    });
  };

  handleSelect = action => {
    action.handle(this.props.selected);
    this.handleClose();
  }

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  render() {
    const {
      actions,
    } = this.props;

    return (
      <div>
        <IconButton
          aria-label="More"
          aria-owns={this.state.anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleOpen}
        >
          <MoreVertIcon/>
        </IconButton>
        <MuiMenu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
        >
          {actions.map(action =>
            <MenuItem
              key={action.label}
              onClick={() => this.handleSelect(action)}
            >{action.label}</MenuItem>
          )}
        </MuiMenu>
      </div>
    );
  }
}

export default Menu;
