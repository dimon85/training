import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { loadAuth, loadMemberInfoAction } from '../reducers/auth';
import { getLangToRedirect } from '../helpers/utils'; 
import RouterContainer from './RouterContainer';

class LanguageContainer extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  async componentDidMount() {
    const { history, store } = this.props;

    // [1] load information about user
    const info = await store.dispatch(loadMemberInfoAction());

    // [2] load auth by token
    await store.dispatch(loadAuth());

    // [3] check, if route without lang, redirect to
    if (history.location.pathname == '/') {
      const lang = getLangToRedirect(info);

      history.push(`/${lang}`);
    }
  }

  render() {
    return (
      <Route path="/:lang" component={RouterContainer} />
    )
  }
}

export default LanguageContainer;
