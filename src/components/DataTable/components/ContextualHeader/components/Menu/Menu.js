import React from 'react';
import IconButton from 'material-ui/IconButton';
import MuiMenu, {MenuItem} from 'material-ui/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';

class Menu extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = e => {
    this.setState({
      anchorEl: e.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  render() {
    return (
      <div>
        <IconButton
          aria-label="More"
          aria-owns={this.state.anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <MuiMenu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}>Profile</MenuItem>
          <MenuItem onClick={this.handleClose}>My account</MenuItem>
          <MenuItem onClick={this.handleClose}>Logout</MenuItem>
        </MuiMenu>
      </div>
    );
  }
}

export default Menu;
