import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import autobind from 'autobind-decorator';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Keyboard from 'material-ui/svg-icons/hardware/keyboard';

export default class AppLayout extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    pathname: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      open: false,
      openPanel: false,
      targetOrigin: {
        horizontal: 'right',
        vertical: 'top'
      }
    };

    this.handleRequestChange = this.handleRequestChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.pathname !== nextProps.pathname) {
      this.setState({ open: false });
    }
  }

  @autobind
  handleClose() {
    this.setState({ openPanel: false });
  }

  @autobind
  handleTogglePanel() {
    this.setState({ openPanel: !this.state.openPanel });
  }

  handleRequestChange(open, reason) {
    if (reason === 'iconTap') {
      this.setState({ open });
      return;
    }

    this.setState({ open: false });
  }

  renderIconMenu() {
    return (<IconButton><MoreVertIcon /></IconButton>);
  }

  renderIconRight() {
    const { targetOrigin, open } = this.state;
    return (
      <IconMenu
        open={open}
        iconButtonElement={this.renderIconMenu()}
        targetOrigin={targetOrigin}
        anchorOrigin={targetOrigin}
        onRequestChange={this.handleRequestChange}
      >
        <Link to="/trainer"><MenuItem primaryText="Trainer" /></Link>
        <Link to="/help"><MenuItem primaryText="Help" /></Link>
        <MenuItem disabled primaryText="Login" />
      </IconMenu>
    );
  }

  renderLogo() {
    return (
      <div className="logo">
        <Link to="/">KeyPress</Link>
      </div>
    );
  }

  render() {
    const { children } = this.props;
    const { openPanel } = this.state;

    return (
      <div>
        <AppBar
          title={this.renderLogo()}
          className="navbar"
          iconElementRight={this.renderIconRight()}
          onLeftIconButtonClick={this.handleTogglePanel}
        />
        <Drawer
          docked={false}
          width={200}
          open={openPanel}
          onRequestChange={open => this.setState({ openPanel: open })}
        >
          <Link to="/trainer">
            <MenuItem
              primaryText="Trainer"
              leftIcon={<Keyboard />}
              onTouchTap={this.handleClose}
            />
          </Link>
          <MenuItem onTouchTap={this.handleClose}>Menu Item 2</MenuItem>
        </Drawer>
        {children}
      </div>
    );
  }
}
