import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Link, Route, Switch } from 'react-router-dom';
// import { loadAuth } from '../reducers/auth';
import { setStatusPage } from '../reducers/info';
import { checkItemInArray } from '../helpers/utils';
import globalConst from '../helpers/constants';
import { getStatusPage } from '../selectors';
import { getAvailableLangs } from '../selectors/translateSelectors';
import App from './App';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import HomePage from '../components/HomePage';
import TrainerPage from '../components/TrainerPage';
import HelpPage from '../components/HelpPage';
import NotFoundPage from '../components/NotFoundPage';


const mapStateToProps = state => ({
  langs: getAvailableLangs(state),
  statusPage: getStatusPage(state),
});

const dispatchToProps = (dispatch) => ({
  setStatusPage: (params) => dispatch(setStatusPage(params)),
});

class RouterContainer extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    statusPage: PropTypes.number.isRequired,
    setStatusPage: PropTypes.func.isRequired,
  };

  state = {
    profile: {},
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { match: { params }, langs, statusPage } = nextProps;

    if (checkItemInArray(langs, params.lang) && statusPage === globalConst.STATUS_NOT_FOUND) {
      nextProps.setStatusPage({ status: globalConst.STATUS_SUCCESS_PAGE, text: 'Page load success' });
    }

    console.log('nextProps::', [nextProps, prevState]);
    return null;
  }

  async componentDidMount() {
    const { match: { params }, langs } = this.props;
    console.log('*[1]*', this.props);

    // [1] check, if route with existing lang
    if (!checkItemInArray(langs, params.lang)) {
      this.props.setStatusPage({ status: 404, msg: 'Not found'});
      console.log('*[2]*');

    }

    // [2] load translations
    console.log('*[3]*');
  }

  render() {
    const { statusPage } = this.props;
    console.log('props', this.props);

    if (statusPage === globalConst.STATUS_NOT_FOUND) {
      return (
        <App {...this.props}>
          <NotFoundPage />
        </App>
      );
    }
    // const { current } = store.getState().auth;

    // console.log('RouterContainer -> props', store.getState().auth.current);

    return (
      <App {...this.props}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/trainer" component={TrainerPage} />
          <Route path="/help" component={HelpPage} />
          <Route
            path="/login"
            render={() => true ?
              <LoginPage /> :
              <Redirect to="/" />}
          />
          <Route path="/signup" component={SignupPage} />
          <Route render={() => (<div>Miss go to<Link to="/">Home</Link> - <Link to="/trainer">trainer</Link></div>)} />
        </Switch>
      </App>
    )
  }
}

export default connect(mapStateToProps, dispatchToProps)(RouterContainer);
