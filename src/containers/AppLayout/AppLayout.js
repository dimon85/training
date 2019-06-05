import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Keyboard from '@material-ui/icons/Keyboard';
import ContactSupport from '@material-ui/icons/ContactSupport';
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
      openPanel: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.history.location.pathname !== nextProps.history.location.pathname) {
      this.setState({ anchorEl: null });
    }
  }

  handleClose = () => {
    this.setState({ openPanel: false });
  }

  handleTogglePanel = () => {
    this.setState((prevState) => ({ openPanel: !prevState.openPanel }));
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

  handleOpenPanel = () => this.setState({ openPanel: true });
  handleClosePanel = () => this.setState({ openPanel: false });

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
    const { langs, currentLang, profile } = this.context;
    const {
      children,
    } = this.props;
    const { openPanel } = this.state;

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
        <Drawer
          width={200}
          open={openPanel}
          onClose={this.handleClosePanel}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.handleTogglePanel}
            onKeyDown={this.handleTogglePanel}
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
            <Divider />
            <List>
              {profile.email && (
                <Link to={`/${currentLang}/profile`}>
                  Profile
                </Link>
              )}
              <ListItem button>
                <ListItemIcon>
                  <Keyboard />
                </ListItemIcon>
                <Link to={`/${currentLang}/trainer`}>
                  <ListItemText primary="Trainer" />
                </Link>
              </ListItem>
            
              <ListItem button>
                <ListItemIcon>
                  <ContactSupport />
                </ListItemIcon>
                <Link to={`/${currentLang}/help`}>
                  <ListItemText primary="Help" />
                </Link>
              </ListItem>
            </List>
          </div>
        </Drawer>
        {children}
        <ToastContainer />
      </div>
    );
  }
}

export default connect(mapStateToProps, dispatchToProps)(AppLayout);
