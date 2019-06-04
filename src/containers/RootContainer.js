import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import LanguageContainer from './LanguageContainer';

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

const RootContainer = (props) => {
  const { store, history } = props;

  return (
    <MuiThemeProvider
      theme={theme}
    >
      <Provider store={store}>
        <LanguageContainer history={history} store={store} />
      </Provider>
    </MuiThemeProvider>
  );
};

RootContainer.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default hot(module)(RootContainer);
