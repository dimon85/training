import ApiClient from './ApiClient';
import AuthApi from './Auth';


// const apiPrefix = process.env.API_ROOT;
const apiPrefix = 'api/v1'; // eslint-disable-line

function apiFactory(prefix) {
  if (!prefix) {
    throw new Error('[apiPrefix] required');
  }

  const api = new ApiClient({ prefix });

  return {
    ApiClient: api,
    auth: new AuthApi({ apiClient: api }),
  };
}

export default apiFactory(apiPrefix);