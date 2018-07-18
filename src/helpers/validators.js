import isEmpty from 'lodash/isEmpty';


export const loginForm = (values) => {
  const errors = {};

  if (!/.+@.+\..+/.test(values.email)) {
    errors.email = 'Email is not valid';
  }

  if (isEmpty(values.email)) {
    errors.email = 'Email is required';
  }

  if (values.password.length < 6) {
    errors.password = 'Minimum of 6 characters is required';
  }

  if (isEmpty(values.password)) {
    errors.password = 'Password is required';
  }

  return errors;
};

export const signupForm = (values) => {
  const errors = {};

  if (isEmpty(values.name)) {
    errors.firstName = 'Name is required';
  }

  if (values.name.length < 4) {
    errors.name = 'Minimum of 4 characters is required';
  }

  if (!/.+@.+\..+/.test(values.email)) {
    errors.email = 'Email is not valid';
  }

  if (isEmpty(values.email)) {
    errors.email = 'Email is required';
  }

  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Confirm password is not valid';
  }

  if (values.password.length < 6) {
    errors.password = 'Minimum of 6 characters is required';
  }

  if (isEmpty(values.password)) {
    errors.password = 'Password is required';
  }

  if (isEmpty(values.confirmPassword)) {
    errors.confirmPassword = 'Password confirm is required';
  }

  if (!values.checkedAgree) {
    errors.checkedAgree = 'The field is required';
  }

  return errors;
};