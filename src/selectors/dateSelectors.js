import moment from 'moment';

export function getMoment(date = {}, format = '', locale = 'en') {
  return moment(date, format).locale(locale);
}

// export const getNowDate = () => getMoment().toDate();
// export const getDate = date => getMoment(date).toDate();
//
// export const getDateFormatted = (data, format) => getMoment(data).format(format);
export const getDateFormattedUtc = (data, format) => getMoment(data).utc().format(format);