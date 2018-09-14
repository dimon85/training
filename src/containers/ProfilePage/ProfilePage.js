import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { showError } from '../../helpers/uiHelper';
import { profileForm } from '../../helpers/validation';
import { updateProfile } from '../../reducers/auth';

const dispatchToProps = dispatch => ({
  updateProfile: (params) => dispatch(updateProfile(params)),
});

export class ProfilePage extends Component {
  static propTypes = {
    updateProfile: PropTypes.func.isRequired,
  };

  static contextTypes = {
    currentLang: PropTypes.string.isRequired,
    profile: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props);
    const { profile } = context;

    this.state = {
      firstName: profile.first_name,
      lastName: profile.last_name,
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
      this.handleUpdate();
    }
  }

  /**
   * Login with email and password
   */
  handleUpdate = () => {
    const { profile } = this.context;
    const {
      firstName,
      lastName,
    } = this.state;
    const params = {};

    if (profile.first_name !== firstName) {
      params.firstName = firstName;
    }

    if (profile.last_name !== lastName) {
      params.lastName = lastName;
    }

    if (isEmpty(params)) {
      showError('Nothing to update');
      return;
    }

    const errors = profileForm(params);

    if (!isEmpty(errors)) {
      this.setState({ errors });
      return;
    }

    const payload = {};
    Object.keys(params).forEach((field) => {
      if (field === 'firstName') {
        payload.first_name = params[field];
      }

      if (field === 'lastName') {
        payload.last_name = params[field];
      }
    });

    this.setState({ loading: true });
    this.props.updateProfile(payload)
      .then(() => this.setState({ loading: false }))
      .catch((error) => {
        this.setState({ loading: false });

        if (!error.data) {
          return;
        }
        console.log('Error', error.data);
      });
  }

  render() {
    const {
      profile
    } = this.context;
    const {
      firstName,
      lastName,
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
      <div className="container landing">
        <h1>Profile page</h1>
        <div className="loginPage">
          <Paper zDepth={4}>
            <div className="paper">
              <div className="paper__body">
                <h3>
                  Profile page
                </h3>
                <TextField
                  name="email"
                  disabled
                  value={profile.email}
                  floatingLabelText="Email"
                  fullWidth
                />
                <TextField
                  name="firstName"
                  value={firstName}
                  hintText="Enter your first name"
                  floatingLabelText="First name"
                  fullWidth
                  errorText={errors.firstName}
                  onChange={this.handleChangeField}
                  onKeyPress={this.handleKeyPress}
                />
                <TextField
                  name="lastName"
                  value={lastName}
                  hintText="Enter your last name"
                  floatingLabelText="Last name"
                  fullWidth
                  errorText={errors.lastName}
                  onChange={this.handleChangeField}
                  onKeyPress={this.handleKeyPress}
                />
                <div>
                  Updated: {moment(profile.updatedAt).format('HH:mm, DD MMM YYYY')}
                </div>
              </div>

              <div className="paper__controls">
                {!loading && (
                  <Button
                    onClick={this.handleUpdate}
                  >
                  Update
                  </Button>
                )}
                {loading && (
                  <CircularProgress
                    size={50}
                    left={0}
                    top={0}
                    loadingColor="#FF9800"
                    status="loading"
                    style={style.refresh}
                  />
                )}
                <a href="#" className="btn">
                  Forgot password
                </a>
              </div>
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}

export default connect(state => state, dispatchToProps)(ProfilePage);
