import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import isEmpty from 'lodash/isEmpty';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { loginForm } from '../../helpers/validation';
import { loginAction, loadAuth } from '../../reducers/auth';

const dispatchToProps = dispatch => ({
  login: (params) => dispatch(loginAction(params)),
  loadAuth: () => dispatch(loadAuth()),
});

export class LoginPage extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    loadAuth: PropTypes.func.isRequired,
  };

  static contextTypes = {
    currentLang: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      loading: false,
      errors: {},
    };
  }



  handleChangeField = (event) => {
    const { name, value } = event.target;
    this.setState(() => ({ [name]: value }));
    this.handleCleanError(name);
  }

  handleCleanError = (name) => {
    this.setState((prevState) => {
      if (prevState.errors[name]) {
        return ({
          errors: {
            ...prevState.errors,
            [name]: '',
          }
        });
      }

      return null;
    });
  }

  /**
   * Handle key press
   * @param {object} event
   */
  handleKeyPress = (event) => {
    const { loading } = this.state;

    if (!loading && event.key === 'Enter') {
      this.handleLogin();
    }
  }

  /**
   * Login with email and password
   */
  handleLogin = () => {
    const { currentLang } = this.context;
    const { history } = this.props;
    const { email, password } = this.state;
    const params = {
      email,
      password,
    };
    const errors = loginForm(params);

    if (!isEmpty(errors)) {
      this.setState({ errors });
      return;
    }

    this.setState({ loading: true });
    this.props.login(params)
      .then(this.props.loadAuth)
      .then(() => history.push(`/${currentLang}`))
      .catch((error) => {
        this.setState({ loading: false });
        if (!error.data) {
          return;
        }

        console.log('Error', error);
        this.setState({
          loading: false,
          errors: error.data.errors,
        });
      });
  }

  render() {
    const {
      email,
      password,
      loading,
      errors,
    } = this.state;
    const style = {
      refresh: {
        display: 'inline-block',
        position: 'relative',
      },
      btn: {
        marginRight: '10px',
      }
    };

    return (
      <div className="container landing">
        <h1>
          Login
        </h1>
        <div className="loginPage">
          <Paper>
            <div className="paper">

              <Typography
                variant="h5"
              >
                Login with your email address
              </Typography>

              <TextField
                fullWidth
                label="email"
                name="email"
                margin="normal"
                value={email}
                error={errors.email}
                helperText={errors.email}
                onChange={this.handleChangeField}
              />

              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                autoComplete="current-password"
                margin="normal"
                value={password}
                error={errors.email}
                helperText={errors.password}
                onChange={this.handleChangeField}
                onKeyPress={this.handleKeyPress}
              />
            </div>

            <div className="paper__controls">
              {!loading && (
                <Button
                  color="primary"
                  variant="outlined"
                  style={style.btn}
                  onClick={this.handleLogin}
                >
                  Log in
                </Button>
              )}
              {loading && (
                <CircularProgress
                  size={50}
                  left={0}
                  top={0}
                  style={style.refresh}
                />
              )}
              <Button
                variant="text"
                
                onClick={this.handleLogin}
              >
                Forgot password
              </Button>
            </div>

          </Paper>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(state => state, dispatchToProps)(LoginPage));
