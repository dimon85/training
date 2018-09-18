import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Keyboard from '@material-ui/icons/Keyboard';
import Help from '@material-ui/icons/Help';
import Person from '@material-ui/icons/Person';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import { ToastContainer } from 'react-toastify';
import { isGuest } from '../../selectors';
import { logoutAction } from '../../reducers/auth';
import { changeLocale } from '../../reducers/translate';

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
    pathname: PropTypes.string.isRequired,
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
      open: false,
      openPanel: false,
      anchorOrigin: {
        horizontal: 'right',
        vertical: 'top'
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.pathname !== nextProps.pathname) {
      this.setState({ open: false });
    }
  }

  handleClose = () => {
    this.setState({ openPanel: false });
  }

  handleTogglePanel = () => {
    this.setState((prevState) => ({ openPanel: !prevState.openPanel }));
  }

  handleRequestChange = (open, reason) => {
    if (reason === 'iconTap') {
      this.setState({ open });
      return;
    }

    this.setState({ open: false });
  }

  /**
   * Handle change locale
   * @param {object} syntheticEvent
   */
  handleChangeLocale = (event) => {
    const { lang } = event.currentTarget.dataset;
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

  handleOpenPane = (open) => this.setState({ openPanel: open })

  handleOpenMenu = (event) => this.setState({ anchorEl: event.currentTarget });
  handleCloseMenu = () => this.setState({ anchorEl: null });

  renderLogo = () => {
    const { currentLang } = this.context;

    return (
      <Typography variant="title">
        <div className="logo">
          <Link to={`/${currentLang}`}>
            KeyPress
          </Link>
        </div>
      </Typography>
    );
  }

  render() {
    const {
      children,
      isGuest,
    } = this.props;
    const {
      anchorEl,
      anchorOrigin,
      open,
      openPanel,
    } = this.state;
    const { langs, currentLang, profile } = this.context;

    return (
      <div>
        <AppBar>
          <Toolbar>
            <IconButton color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            {this.renderLogo()}
            {isGuest && (
              <div>
                <IconButton
                  color="inherit"
                  aria-owns={anchorEl ? 'simple-menu' : null}
                  aria-haspopup="true"
                  onClick={this.handleClick}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="simple-menu"
                  open={true}
                  anchorEl={anchorEl}
                  anchorOrigin={anchorOrigin}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  onClose={this.handleCloseMenu}
                >
                  <Link to={`/${currentLang}/login`}>
                    <MenuItem primaryText="Login" />
                  </Link>
                  <Link to={`/${currentLang}/signup`}>
                    <MenuItem primaryText="Signup" />
                  </Link>
                </Menu>
              </div>
            )}

            {!isGuest && (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                  <MenuItem onClick={this.handleClose}>My account</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
        <Drawer
          docked={false}
          width={200}
          open={openPanel}
          onRequestChange={this.handleOpenPane}
        >
          <div className="languageContainer">
            {langs.map((item) => {
              return (
                <div key={item} className="languageContainer__item">
                  <Button
                    variant="outlined"
                    data-lang={item}
                    color={item === currentLang ? 'primary' : null}
                    fullWidth
                    onClick={this.handleChangeLocale}
                  >
                    {item}
                  </Button>
                </div>
              );
            })}
          </div>
          {profile.email && (
            <Link to={`/${currentLang}/profile`}>
              <MenuItem
                primaryText="Profile"
                leftIcon={<Person />}
                onClick={this.handleClose}
              />
            </Link>
          )}
          <Link to={`/${currentLang}/trainer`}>
            <MenuItem
              primaryText="Trainer"
              leftIcon={<Keyboard />}
              onClick={this.handleClose}
            />
          </Link>
          <Link to={`/${currentLang}/help`}>
            <MenuItem
              primaryText="Help"
              leftIcon={<Help />}
              onClick={this.handleClose}
            />
          </Link>
        </Drawer>
        {children}
        <ToastContainer />
      </div>
    );
  }
}

export default connect(mapStateToProps, dispatchToProps)(AppLayout);
