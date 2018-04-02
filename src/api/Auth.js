import Base from './Base';

export default class Auth extends Base {
  async login(url, payload) {
    console.log('URL', url)
    const data = await this.apiClient.post(url, payload);

    return data;
  }

  async signup(url, payload) {
    const data = await this.apiClient.post(url, payload);

    return data;
  }

  async forgot(url, payload) {
    const data = await this.apiClient.post(url, payload);

    return data;
  }

  async reset(url, payload) {
    const data = await this.apiClient.post(url, payload);

    return data;
  }

  setAuthToken(token) {
    this.apiClient.setAuthToken(token);
  }
}