import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppLayout from './AppLayout';

const mapStateToProps = state => {
  return state;
};

export class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
  };

  constructor(props) {
  super(props);
    this.state = {
    loading: false,
  };
  }

  render() {
    const { children, router } = this.props;

    return (
      <MuiThemeProvider>
        <AppLayout
          pathname={router.location.pathname}
        >
          {children}
        </AppLayout>
      </MuiThemeProvider>
    );
  }
}


export default connect(mapStateToProps)(App);