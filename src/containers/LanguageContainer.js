import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { loadAuth, loadMemberInfoAction } from '../reducers/auth';
import { getLangToRedirect } from '../helpers/utils';
import RouterContainer from './RouterContainer';

class LanguageContainer extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      locale: ''
    }
  }

  async componentDidMount() {
    const { history, store } = this.props;

    // [1] load information about user
    const info = await store.dispatch(loadMemberInfoAction());

    // [2] load auth by token
    await store.dispatch(loadAuth());

    // [3] check, if route without lang, redirect to
    if (history.location.pathname === '/') {
      const lang = getLangToRedirect(info);
      this.setState({ locale: lang })
    }
  }

  render() {
    const { history } = this.props;
    const { locale } = this.state;

    if (!locale && history.location.pathname === '/') {
      return 'Loading';
    }

    return (
      <BrowserRouter>
        {locale && <Redirect from="/" to={`/${locale}`} />}
        <Route path="/:lang" component={RouterContainer} />
      </BrowserRouter>
    );
  }
}

export default LanguageContainer;
