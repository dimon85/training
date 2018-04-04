import isEmpty from 'lodash/isEmpty';


export const loginForm = (values) => {
  const errors = {};

  if (!/.+@.+\..+/.test(values.email)) {
    errors.email = 'Email is not valid';
  }

  if (isEmpty(values.email)) {
    errors.email = 'Email is required';
  }

  if (isEmpty(values.password)) {
    errors.password = 'Password is required';
  }

  return errors;
};