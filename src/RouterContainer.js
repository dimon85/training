import React from 'react';
import PropTypes from 'prop-types';
import { Link, Route, Switch } from 'react-router-dom';
import App from './containers/App';
import LoginPage from './containers/LoginPage';
import SignupPage from './containers/SignupPage';
import HomePage from './components/HomePage';
import TrainerPage from './components/TrainerPage';
import HelpPage from './components/HelpPage';

const RouterContainer = (props) => {
  console.log('RouterContainer -> props', props.store.getState().auth);
  return (
    <App>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/trainer" component={TrainerPage} />
        <Route path="/help" component={HelpPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />
        <Route render={() => (<div>Miss go to<Link to="/">Home</Link> - <Link to="/trainer">trainer</Link></div>)} />
      </Switch>
    </App>
  )
};

RouterContainer.propTypes = {
  store: PropTypes.object.isRequired,
};

export default RouterContainer;