import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import App from './components/App';
import HomePage from './components/HomePage';
import TrainerPage from './components/TrainerPage';
import HelpPage from './components/HelpPage';
import LoginPage from './conteiners/LoginPage';

export default () =>
/**
   * Please keep routes in alphabetical order
   */
  (
    <App>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/trainer" component={TrainerPage} />
        <Route path="/help" component={HelpPage} />
        <Route path="/login" component={LoginPage} />
        <Route render={() => (<div>Miss go to<Link to="/">Home</Link> - <Link to="/trainer">trainer</Link></div>)} />
      </Switch>
    </App>
  );