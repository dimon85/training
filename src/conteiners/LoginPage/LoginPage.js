import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { loginAction } from '../../reducers/auth';
import { isGuest } from '../../selectors';


const mapStateToProps = state => ({
  isGuest: isGuest(state),
});

const dispatchToProps = dispatch => ({
  login: (params) => dispatch(loginAction(params))
});

export class LoginPage extends Component {
  static propTypes = {
    isGuest: PropTypes.bool.isRequired,
    login: PropTypes.func.isRequired,
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
        })
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

  @autobind
  handleLogin() {
    const { email, password } = this.state;
    this.setState({ loading: true });
    console.log('Login', email, ':', password);
    this.props.login({ email, password }).then((data) => {
      this.setState({ loading: false });
      console.log('data', data);
    }).catch((error) => {
      console.log('Error', error);
      this.setState({
        loading: false,
        errors: error.data.errors,
      });
    });
  }

  render() {
    const { isGuest } = this.props;
    const {
      email,
      password,
      loading,
      errors,
    } = this.state;

    return (
      <div className="container">
        <h1>Login</h1>
        <Paper zDepth={4}>
          <div className="paper__area">
            <div className="paper__header hidden">
              <h3>Connect with a social network**</h3>
              <div>
                <div>Facebook</div>
                <div>Google+</div>
              </div>
            </div>
            <div className="paper__body">
              <h3>Log in with your email address</h3>
              <TextField
                name="email"
                value={email}
                hintText="Enter your email"
                floatingLabelText="Email"
                errorText={errors.email}
                onChange={this.handleChangeField}
              />
              <TextField
                type="password"
                name="password"
                vaule={password}
                hintText="Enter your password"
                floatingLabelText="Password"
                errorText={errors.password}
                onChange={this.handleChangeField}
                onKeyPress={this.handleKeyPress}
              />
              <RaisedButton
                label="Log in"
                disabled={loading}
                primary={Boolean(true)}
                onTouchTap={this.handleLogin}
              />
              <div>Forgot password</div>
            </div>
          </div>
        </Paper>

      </div>
    );
  }
}

export default connect(mapStateToProps, dispatchToProps)(LoginPage);
