import React from 'react';
import { Link, Route, Switch } from 'react-router-dom'
import App from './components/App';
import HomePage from './components/HomePage';
import TrainerPage from './components/TrainerPage';

export default (store) => {
    /**
   * Please keep routes in alphabetical order
   */
  return (
    <App>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/trainer" component={TrainerPage} />
        <Route render={() => (<div>Miss go to<Link to="/">Home</Link> - <Link to="/trainer">trainer</Link></div>)} />
      </Switch>
    </App>
  );
};