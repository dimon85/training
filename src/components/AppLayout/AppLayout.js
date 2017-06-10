import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

export class AppLayout extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    pathname: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      open: false,
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

  renderIconMenu() {
    return (<IconButton><MoreVertIcon /></IconButton>);
  }

  renderIconRight() {
    const { targetOrigin, open } = this.state;
    return(
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
    )
  };

  handleRequestChange(open, reason) {
    if (reason === 'iconTap') {
      this.setState({ open });
      return;
    }

    this.setState({ open: false })
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

    return (
      <div>
        <AppBar
          title={this.renderLogo()}
          className="navbar"
          iconElementRight={this.renderIconRight()}
        />
        {children}
      </div>
    );
  }
}


export default AppLayout;
