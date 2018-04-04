import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppLayout from './AppLayout';

const mapStateToProps = state => state;

function App({ children, router }) {
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

App.propTypes = {
  children: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(App);