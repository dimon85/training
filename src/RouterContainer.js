import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link, Route, Switch } from 'react-router-dom';
import App from './containers/App';
import LoginPage from './containers/LoginPage';
import SignupPage from './containers/SignupPage';
import HomePage from './components/HomePage';
import TrainerPage from './components/TrainerPage';
import HelpPage from './components/HelpPage';

const RouterContainer = (props) => {
  const { auth } = props.store.getState();
  const isAuthenticated  = auth.current._id;
  // if (auth.token) {

  // }

  console.log('RouterContainer -> props', auth);
  return (
    <App {...props}>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/trainer" component={TrainerPage} />
        <Route path="/help" component={HelpPage} />
        <Route
          path="/login"
          render={() => !isAuthenticated ?
            <LoginPage /> :
            <Redirect to="/" />}
        />
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