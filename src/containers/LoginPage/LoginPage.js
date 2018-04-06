import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import autobind from 'autobind-decorator';
import isEmpty from 'lodash/isEmpty';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import { loginForm } from '../../helpers/validators';
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

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      loading: false,
      errors: {},
    };
  }

  @autobind
  handleChangeField(event) {
    const { name, value } = event.target;
    this.setState(() => ({ [name]: value }));
    this.handleCleanError(name);
  }

  @autobind
  handleCleanError(name) {
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
    this.props.login({ email, password })
      .then(this.props.loadAuth)
      .then(() => history.push({ pathname: '/' }))
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
    };

    return (
      <div className="container">
        <h1>Login</h1>
        <div className="loginPage">
          <Paper zDepth={4}>
            <div className="paper">
              <div className="paper__body">
                <h3>Login with your email address</h3>
                <TextField
                  name="email"
                  value={email}
                  hintText="Enter your email"
                  floatingLabelText="Email"
                  fullWidth
                  errorText={errors.email}
                  onChange={this.handleChangeField}
                />
                <TextField
                  type="password"
                  name="password"
                  value={password}
                  hintText="Enter your password"
                  floatingLabelText="Password"
                  fullWidth
                  errorText={errors.password}
                  onChange={this.handleChangeField}
                  onKeyPress={this.handleKeyPress}
                />
              </div>

              <div className="paper__controls">
                {!loading &&
                  <RaisedButton
                    label="Log in"
                    primary={Boolean(true)}
                    onTouchTap={this.handleLogin}
                  />
                }
                {loading && 
                  <RefreshIndicator
                    size={50}
                    left={0}
                    top={0}
                    loadingColor="#FF9800"
                    status="loading"
                    style={style.refresh}
                  />
                }
                <a href="#" className="btn">Forgot password</a>
              </div>
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(state => state, dispatchToProps)(LoginPage));
