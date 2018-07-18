import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { setStatusPage } from '../reducers/info';
import { changeLocale } from '../reducers/translate';
import { checkItemInArray } from '../helpers/utils';
import globalConst from '../helpers/constants';
import { getStatusPage, getProfile } from '../selectors';
import { getAvailableLangs, getCurrentLang } from '../selectors/translateSelectors';
import App from './App';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import ProfilePage from './ProfilePage';
import HomePage from '../components/HomePage';
import TrainerPage from '../components/TrainerPage';
import HelpPage from '../components/HelpPage';
import NotFoundPage from '../components/NotFoundPage';

const mapStateToProps = state => ({
  langs: getAvailableLangs(state),
  currentLang: getCurrentLang(state),
  statusPage: getStatusPage(state),
  profile: getProfile(state),
});

const dispatchToProps = dispatch => ({
  setStatusPage: params => dispatch(setStatusPage(params)),
  changeLocale: lang => dispatch(changeLocale(lang)),
});

class RouterContainer extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    langs: PropTypes.array.isRequired,
    profile: PropTypes.object.isRequired,
    currentLang: PropTypes.string.isRequired,
    statusPage: PropTypes.number.isRequired,
    setStatusPage: PropTypes.func.isRequired,
    changeLocale: PropTypes.func.isRequired,
  };

  static childContextTypes = {
    currentLang: PropTypes.string.isRequired,
    langs: PropTypes.array.isRequired,
    profile: PropTypes.object.isRequired,
  };

  state = {
    loading: false,
  };

  getChildContext() {
    return {
      currentLang: this.props.currentLang,
      langs: this.props.langs,
      profile: this.props.profile,
    };
  }

  async componentDidMount() {
    const {
      match: { params },
      langs,
      currentLang,
    } = this.props;

    // [1] check, if route with existing lang
    if (!checkItemInArray(langs, params.lang)) {
      this.props.setStatusPage({ status: 404, msg: 'Not found'});
      return;
    }

    // [2] set current lang
    if (params.lang !== currentLang) {
      this.props.changeLocale(params.lang);
    }
  }

  static getDerivedStateFromProps(nextProps) {
    const { match: { params }, langs, statusPage } = nextProps;

    if (checkItemInArray(langs, params.lang) && statusPage === globalConst.STATUS_NOT_FOUND) {
      nextProps.setStatusPage({ status: globalConst.STATUS_SUCCESS_PAGE, text: 'Page load success' });
    }

    if (!checkItemInArray(langs, params.lang)) {
      nextProps.setStatusPage({ status: globalConst.STATUS_NOT_FOUND, text: 'Page not found' });
    }

    return null;
  }

  render() {
    const {
      currentLang,
      match,
      statusPage,
      profile,
    } = this.props;

    if (statusPage === globalConst.STATUS_NOT_FOUND) {
      return (
        <App {...this.props}>
          <NotFoundPage />
        </App>
      );
    }

    // if (!authLoaded)

    return (
      <App {...this.props}>
        <div>
          <Switch>
            <Route exact path={`${match.path}`} component={HomePage} />
            <Route path={`${match.path}/trainer`} component={TrainerPage} />
            <Route path="/:lang/help" component={HelpPage} />
            <Route
              path="/:lang/login"
              render={() => !profile.email ?
                <LoginPage /> :
                <Redirect to={`/${currentLang}`} />
              }
            />
            <Route
              path="/:lang/signup"
              render={() => !profile.email ?
                <SignupPage /> :
                <Redirect to={`/${currentLang}`} />
              }
            />
            <Route
              path="/:lang/profile"
              render={() => profile.email ?
                <ProfilePage />
                :
                <Redirect to={`/${currentLang}/login`} />
              }
            />
            <Route exact path="/:lang/*" component={NotFoundPage} />
          </Switch>
        </div>
      </App>
    )
  }
}

export default connect(mapStateToProps, dispatchToProps)(RouterContainer);
