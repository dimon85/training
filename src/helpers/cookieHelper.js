const SUGAR = 'sA';

const createCookie = (name, value = '', days = '') => {
  let expires = '';

  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = `; expires=${date.toUTCString()}`;
  }

  document.cookie = `${name}=${SUGAR}.${value}${expires}; path=/`;
};

const readCookie = (name) => {
  const nameEQ = `${name}=${SUGAR}.`;
  const ca = document.cookie.split(';');

  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }

  return null;
};

const getCookie = (key) => {
  const value = readCookie(key);

  return value || false;
};

const removeCookie = (key) => {
  document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
};

export default {
  get: getCookie,
  set: createCookie,
  remove: removeCookie,
};