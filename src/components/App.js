import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const mapStateToProps = state => {
  return state;
};

export class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }
  render() {
    const { children } = this.props;

    return (
      <MuiThemeProvider>
        {children}
      </MuiThemeProvider>
    );
  }
}


export default connect(mapStateToProps)(App);