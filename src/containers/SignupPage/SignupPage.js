import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { signupForm } from '../../helpers/validation';
import { signupAction } from '../../reducers/auth';

// Styles for checkbox
const styles = {
  refresh: {
    display: 'inline-block',
    position: 'relative',
  },
  btn: {
    marginRight: '10px',
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

    return (
      <div className="container landing">
        <h1>Signup</h1>
        <div className="loginPage">
          <Paper>
            <div className="paper">

              <Typography
                variant="h5"
              >
                Signup with your email address
              </Typography>

              <TextField
                fullWidth
                label="name"
                name="name"
                margin="normal"
                value={name}
                error={errors.name}
                helperText={errors.name}
                onChange={this.handleChangeField}
              />
              <TextField
                fullWidth
                label="email"
                type="email"
                name="email"
                margin="normal"
                value={email}
                error={errors.email}
                helperText={errors.email}
                onChange={this.handleChangeField}
              />
              <TextField
                fullWidth
                type="password"
                name="password"
                label="Password"
                margin="normal"
                value={password}
                error={errors.password}
                helperText={errors.password}
                onChange={this.handleChangeField}
              />
              <TextField
                fullWidth
                type="password"
                name="confirmPassword"
                label="Confirm your password"
                margin="normal"
                value={confirmPassword}
                error={errors.confirmPassword}
                helperText={errors.confirmPassword}
                onChange={this.handleChangeField}
              />
              <FormControlLabel
                control={(
                  <Checkbox
                    name="checkedAgree"
                    checked={checkedAgree}
                    onChange={this.updateCheckField}
                  />
                )}
                label="I agree with Terms and Conditions and Privacy"
              />
              {errors.checkedAgree && (
                <div className="error">
                  {errors.checkedAgree}
                </div>
              )}

            </div>

            <div className="paper__controls">
              {!loading && (
                <Button
                  color="primary"
                  variant="outlined"
                  onClick={this.handleSignup}
                >
                  Create account
                </Button>
              )}
              {loading && (
                <CircularProgress
                  size={50}
                  left={0}
                  top={0}
                  style={styles.refresh}
                />
              )}
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}

export default connect(state => state, dispatchToProps)(SignupPage);
