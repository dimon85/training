import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import AppLayout from './AppLayout';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00bcd4',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#00acc1'
    },
    
  }
});
const mapStateToProps = state => state;

function App({ children, router, history }) {
  return (
    <MuiThemeProvider
      theme={theme}
    >
      <AppLayout
        pathname={router.location.pathname}
        history={history}
      >
        {children}
      </AppLayout>
    </MuiThemeProvider>
  );
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(App);