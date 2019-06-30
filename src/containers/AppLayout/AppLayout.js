import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { isGuest } from '../../selectors';
import { logoutAction } from '../../reducers/auth';
import { changeLocale } from '../../reducers/translate';
import Sidebar from './Sidebar';
import MainTopBar from './MainTopBar';

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
      leftPanel: false,
    };
  }

  /**
   * Handle toggle panel
   * @param {object}
   */
  handleUpdateState = ({ name, value = false }) => {
    this.setState({ [name]: value });
  }

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

  render() {
    const {
      children,
      isGuest,
    } = this.props;
    const { leftPanel } = this.state;

    return (
      <div>
        <MainTopBar
          isGuest={isGuest}
          onToggle={this.handleUpdateState}
        />
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
