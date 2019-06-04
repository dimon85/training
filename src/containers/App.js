import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import AppLayout from './AppLayout';

// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       main: '#00bcd4',
//       contrastText: '#ffffff'
//     },
//     secondary: {
//       main: '#00acc1'
//     },
    
//   }
// });
const mapStateToProps = state => state;

function App(props) {
  const { children } = props;

  return (
    <AppLayout
      {...props}
    >
      {children}
    </AppLayout>
  );
}

App.propTypes = {
  children: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(App);