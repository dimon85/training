import cookieHelper from './cookieHelper';


export const getLangFromCountryCode = (code) => {
  if (code === 'UA') {
    return 'ua';
  }

  if (code === 'RU') {
    return 'ru';
  }

  return 'en';
};

export const getLangToRedirect = (data) => {
  if (cookieHelper.get('lang')) {
    return cookieHelper.get('lang')
  }

  return getLangFromCountryCode(data.country_code);
}

export const checkItemInArray = (arr = [], item) => arr.indexOf(item) > -1;