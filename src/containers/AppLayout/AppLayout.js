import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { ToastContainer } from 'react-toastify';
import { isGuest } from '../../selectors';
import { logoutAction } from '../../reducers/auth';
import { changeLocale } from '../../reducers/translate';
import Sidebar from './Sidebar';

const mapStateToProps = state => ({
  isGuest: isGuest(state),
});

const dispatchToProps = (dispatch) => ({
  logout: () => dispatch(logoutAction()),
  changeLocale: lang => dispatch(changeLocale(lang)),
});

export class AppLayout extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired,
    isGuest: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
    changeLocale: PropTypes.func.isRequired,
  };

  static contextTypes = {
    langs: PropTypes.array.isRequired,
    currentLang: PropTypes.string.isRequired,
    profile: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
      leftPanel: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.history.location.pathname !== nextProps.history.location.pathname) {
      this.setState({ anchorEl: null });
    }
  }

  /**
   * Handle toggle panel
   * @param {object}
   */
  handleUpdateState = ({ name, value = false }) => {
    this.setState({ [name]: value });
  }

  handleClose = () => this.setState({ leftPanel: false });
  handleOpenPanel = () => this.setState({ leftPanel: true });
  handleClosePanel = () => this.setState({ leftPanel: false });

  /**
   * Handle change locale
   * @param {string} lang
   */
  handleChangeLocale = (lang) => {
    const { history: { location } } = this.props;

    this.props.changeLocale(lang).then(() => {
      const { pathname, search } = location;
      const newUrl = pathname.split('/').splice(2).join('/');
  
      this.redirectToLocale(lang, newUrl, search);
    });
  }

  redirectToLocale = (locale, url, search = '') => {
    let pathname = `/${locale}`;

    if (url) {
      pathname += `/${url}`;
    }

    this.props.history.push({ pathname, search });
  }

  /**
   * Handle logout process
   */
  handleLogout = () => {
    const { currentLang } = this.context;

    this.props.logout()
      .then(() => this.redirectToLocale(currentLang))
      .catch((error) => {
        console.log('handleLogout -> error', error);
      });
  }

  handleOpenMenu = event => this.setState({
    anchorEl: event.currentTarget,
  });

  handleCloseMenu = () => this.setState({ anchorEl: null });

  renderLogo = () => {
    const { currentLang } = this.context;

    return (
      <Typography variant="h6">
        <div className="logo">
          <Link to={`/${currentLang}`}>
            KeyPress
          </Link>
        </div>
      </Typography>
    );
  }

  renderMenu() {
    const { currentLang } = this.context;
    const { isGuest } = this.props;
    const { anchorEl } = this.state;

    if (!isGuest) {
      return (
        <div>
          <IconButton
            color="inherit"
            aria-owns={anchorEl ? 'header-menu' : null}
            aria-haspopup="true"
            onClick={this.handleOpenMenu}
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="header-appbar"
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={this.handleCloseMenu}
          >
            <MenuItem onClick={this.handleClose}>Profile</MenuItem>
            <MenuItem onClick={this.handleClose}>My account</MenuItem>
          </Menu>
        </div>
      );
    }

    return (
      <div>
        <IconButton
          color="inherit"
          aria-owns={anchorEl ? 'header-menu' : null}
          aria-haspopup="true"
          onClick={this.handleOpenMenu}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="header-menu"
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={this.handleCloseMenu}
        >
          <Link to={`/${currentLang}/login`}>
            <MenuItem>Login</MenuItem>
          </Link>
          <Link to={`/${currentLang}/signup`}>
            <MenuItem>Signup</MenuItem>
          </Link>
        </Menu>
      </div>
    );
  }

  render() {
    const {
      children,
    } = this.props;
    const { leftPanel } = this.state;

    return (
      <div>
        <AppBar>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Menu"
              onClick={this.handleOpenPanel}
            >
              <MenuIcon />
            </IconButton>
            {this.renderLogo()}
            <div className="grow" />
            {this.renderMenu()}
          </Toolbar>
        </AppBar>
        <Sidebar
          name="leftPanel"
          open={leftPanel}
          onToggle={this.handleUpdateState}
          onChangeLang={this.handleChangeLocale}
        />

        {children}
        <ToastContainer />
      </div>
    );
  }
}

export default connect(mapStateToProps, dispatchToProps)(AppLayout);
