import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link, Route, Switch } from 'react-router-dom';
import { loadAuth } from '../reducers/auth';
import App from './App';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import HomePage from '../components/HomePage';
import TrainerPage from '../components/TrainerPage';
import HelpPage from '../components/HelpPage';

class RouterContainer extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
  };

  state = {
    profile: {},
  };

  async componentDidMount() {
    console.log('[1]');

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
    const { store } = this.props;
    const { current } = store.getState().auth;

    console.log('RouterContainer -> props', store.getState().auth.current);

    return (
      <App {...this.props}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/trainer" component={TrainerPage} />
          <Route path="/help" component={HelpPage} />
          <Route
            path="/login"
            render={() => !current._id ?
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

export default RouterContainer;
