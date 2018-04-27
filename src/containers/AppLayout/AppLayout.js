import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import autobind from 'autobind-decorator';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Keyboard from 'material-ui/svg-icons/hardware/keyboard';
import FlatButton from 'material-ui/FlatButton';
import { ToastContainer } from 'react-toastify';
import { isGuest } from '../../selectors';
import { logoutAction } from '../../reducers/auth';
import { changeLocale } from '../../reducers/translate';

const styles = {
  appBar: {
    position: "fixed",
    top: 0,
  },
};

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
  };

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      openPanel: false,
      targetOrigin: {
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

  @autobind
  handleClose() {
    this.setState({ openPanel: false });
  }

  @autobind
  handleTogglePanel() {
    this.setState({ openPanel: !this.state.openPanel });
  }

  @autobind
  handleRequestChange(open, reason) {
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
    console.log(this.props);


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
    const { history } = this.props;

    this.props.logout()
      .then(() => history.push({ pathname: '/' }))
      .catch((error) => {
        console.log('handleLogout -> error', error);
      });
  }

  renderIconMenu() {
    return (<IconButton><MoreVertIcon /></IconButton>);
  }

  renderIconRight(isGuest) {
    if (!isGuest) {
      return (
        <FlatButton
          label="Logout"
          onClick={this.handleLogout}
        />
      );
    }

    const { targetOrigin, open } = this.state;
    return (
      <IconMenu
        open={open}
        iconButtonElement={this.renderIconMenu()}
        targetOrigin={targetOrigin}
        anchorOrigin={targetOrigin}
        onRequestChange={this.handleRequestChange}
      >
        <Link to="/login"><MenuItem primaryText="Login" /></Link>
        <Link to="/signup"><MenuItem primaryText="Signup" /></Link>
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
    const { children, isGuest } = this.props;
    const { openPanel } = this.state;
    const { langs, currentLang } = this.context;

    console.log('fff', [currentLang]);
    return (
      <div>
        <AppBar
          title={this.renderLogo()}
          className="navbar"
          iconElementRight={this.renderIconRight(isGuest)}
          onLeftIconButtonClick={this.handleTogglePanel}
          style={styles.appBar}
        />
        <Drawer
          docked={false}
          width={200}
          open={openPanel}
          onRequestChange={open => this.setState({ openPanel: open })}
        >
          <div className="languageContainer">
            {langs.map((item) => {

              return (
                <div key={item} className="languageContainer__item">
                  <FlatButton
                    data-lang={item}
                    label={item}
                    primary={item === currentLang}
                    fullWidth
                    onTouchTap={this.handleChangeLocale}
                  />
                </div>
              );
            })}
          </div>
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
        <ToastContainer />
      </div>
    );
  }
}

export default connect(mapStateToProps, dispatchToProps)(AppLayout);
