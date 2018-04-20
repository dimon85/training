import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Link, Route, Switch } from 'react-router-dom';
import { loadAuth } from '../reducers/auth';
import RouterContainer from './RouterContainer';
import { getAvailableLangs } from '../selectors/translateSelectors';
// import App from './containers/App';
// import LoginPage from './containers/LoginPage';
// import SignupPage from './containers/SignupPage';
// import HomePage from './components/HomePage';
// import TrainerPage from './components/TrainerPage';
// import HelpPage from './components/HelpPage';


const mapStateToProps = state => ({
  langs: getAvailableLangs(state),
  // localization: getLocalization(state),
  // currentLang: getCurrentLocale(state),
  // currentOrg: getCurrentOrg(state),
  // token: isUserToken(state),
  // pageInfo: getInfoPage(state),
  // userInfo: getUserInfo(state),
  // langs: getLocalizationList(state),
});

const dispatchToProps = dispatch => ({
  loadAuth: () => dispatch(loadAuth()),
});

class LanguageContainer extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    langs: PropTypes.array.isRequired,
  };

  static getDerivedStateFromProps(nextProps) {
    console.log('nextProps::', [nextProps, nextProps.store.getState()]);
    return null;
  }

  state = {
    profile: {},
  };

  async componentDidMount() {
    console.log('[1]', this.props);

    await this.props.store.dispatch(loadAuth())
      .then((data) => {
        const { user } = data.result;
        console.log('[2]', data);
        this.setState({ profile: user });
      })
      .catch((err) => {
        console.log('[2.err]', err.error);
      });
 
    console.log('[3]');
  }

  render() {
    // const { store } = this.props;
    // const { current } = store.getState().auth;

    // console.log('RouterContainer -> props', store.getState().auth.current);

    return (
      <Route exact path="/:lang" component={RouterContainer} />
    )
  }
}

export default connect(mapStateToProps, dispatchToProps)(LanguageContainer);
