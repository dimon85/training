import qs from 'qs';
import axios from 'axios';
import cookieHelper from '../helpers/cookieHelper';

export default class ApiClient {
  constructor({ prefix } = {}) {
    this.prefix = prefix;
  }

  async get(url, params) {
    const query = params ? `?${qs.stringify(params, { encode: false, skipNulls: true })}` : '';
    const data = await this.request({ url, method: 'GET', query });

    return data;
  }

  async getExternal(url) {
    const data = await this.externalRequest({ url, method: 'GET' });

    return data;
  }

  async post(url, payload) {
    const data = await this.request({ url, method: 'POST', data: payload });

    return data;
  }

  async put(url, payload) {
    const data = await this.request({ url, method: 'PUT', data: payload });

    return data;
  }

  async delete(url) {
    const data = await this.request({ url, method: 'DELETE' });

    return data;
  }

  async request({ url, method, query = '', data }) {
    try {
      const authToken = this.authToken ? this.authToken : cookieHelper.get('token');
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      };

      if (authToken && authToken.length) {
        headers.Authorization = `Bearer ${authToken}`;
      }

      const options = {
        url: `${this.prefix}/${url}${query}`,
        method,
        data: method !== 'GET' ? qs.stringify(data, { encode: true, skipNulls: true }) : undefined,
        headers,
      };
      const resp = await axios(options);

      return resp.data;
    } catch (error) {
      throw error.response;
    }
  }

  async externalRequest({ url, method }) {
    try {
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      };
      const options = {
        url,
        method,
        headers,
      };
      const resp = await axios(options);

      return resp.data;
    } catch (error) {
      throw error.response;
    }
  }

  setAuthToken(authToken) {
    this.authToken = authToken;
  }
}