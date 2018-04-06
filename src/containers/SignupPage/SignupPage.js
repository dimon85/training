import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import Checkbox from 'material-ui/Checkbox';
import { signupForm } from '../../helpers/validators';
import { signupAction } from '../../reducers/auth';

// Styles for checkbox
const styles = {
  checkbox: {
    marginTop: 20,
  },
  label: {
    fontSize: 14,
  }
};

const dispatchToProps = dispatch => ({
  signup: (params) => dispatch(signupAction(params))
});

export class SignupPage extends Component {
  static propTypes = {
    signup: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      checkedAgree: false,
      loading: false,
      errors: {},
    };
  }

  /**
   * Change state for current field, clean error
   * @param {SynteticEvent} event
   */
  handleChangeField = (event) => {
    const { name, value } = event.target;

    this.setState(() => ({ [name]: value }));
    this.handleCleanError(name);
  }
  
  /**
   * Change state for checkbox, clean error
   * @param {SynteticEvent} event
   */
  updateCheckField = (event) => {
    const { name } = event.target;
    this.setState((prevState) => ({ [name]: !prevState[name] }));
    this.handleCleanError(name);
  }

  /**
   * Clean error for current field
   * @param {string} name
   */
  handleCleanError = (name) => {
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
   * Login with email and password
   */
  handleSignup = () => {
    const {
      name,
      email,
      password,
      confirmPassword,
      checkedAgree,
    } = this.state;
    const params = {
      name: name.trim(),
      email: email.trim(),
      password,
      confirmPassword,
      checkedAgree,
    };
    const errors = signupForm(params);

    if (!isEmpty(errors)) {
      this.setState({ errors });
      return;
    }

    this.setState({ loading: true });
    this.props.signup(params).then((data) => {
      this.setState({ loading: false });
      console.log('data', data);
    }).catch((error) => {
      this.setState({ loading: false });
      if (!error.data || !error.data.errors) {
        return;
      }

      console.log('Error', error);
      this.setState({
        errors: error.data.errors,
      });
    });
  }

  render() {
    const {
      name,
      email,
      password,
      confirmPassword,
      checkedAgree,
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
        <h1>Signup</h1>
        <div className="loginPage">
          <Paper zDepth={4}>
            <div className="paper">
              <div className="paper__body">
                <h3>Signup with your email address</h3>
                <TextField
                  name="name"
                  value={name}
                  hintText="Enter your name"
                  floatingLabelText="Name"
                  fullWidth
                  errorText={errors.name}
                  onChange={this.handleChangeField}
                />
                <TextField
                  type="email"
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
                  vaule={password}
                  hintText="Enter your password"
                  floatingLabelText="Password"
                  fullWidth
                  errorText={errors.password}
                  onChange={this.handleChangeField}
                />
                <TextField
                  type="password"
                  name="confirmPassword"
                  vaule={confirmPassword}
                  hintText="Confirm your password"
                  floatingLabelText="Password confirm"
                  fullWidth
                  errorText={errors.confirmPassword}
                  onChange={this.handleChangeField}
                />
                <Checkbox
                  name="checkedAgree"
                  label="I agree with Terms and Conditions and Privacy"
                  checked={checkedAgree}
                  onCheck={this.updateCheckField}
                  style={styles.checkbox}
                  labelStyle={styles.label}
                />
                {errors.checkedAgree && <div className="error">{errors.checkedAgree}</div>}
              </div>

              <div className="paper__controls">
                {!loading &&
                  <RaisedButton
                    label="Create account"
                    primary={Boolean(true)}
                    onTouchTap={this.handleSignup}
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
              </div>
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}

export default connect(state => state, dispatchToProps)(SignupPage);
