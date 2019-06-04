import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppLayout from './AppLayout';

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