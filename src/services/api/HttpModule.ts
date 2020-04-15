import axios from 'axios';
import { toast } from 'react-toastify';
import i18n from '../../i18n';

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const expectedError = error.response
      && error.response.status >= 400
      && error.response.status < 500;

    if (!expectedError) {
      console.log('Logging the error', error);
    } else {
      toast.error(i18n.t('Something went wrong. Please, try again later.'));
    }

    return Promise.reject(error);
  },
);

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  parse: (url: string, params?: Record<string, string>): string => {
    let result = url;
    if (params) {
      const parameters = Object.entries(params);
      parameters.forEach((parameter) => {
        const regex = new RegExp(`{${parameter[0]}}`, 'g');
        result = result.replace(regex, parameter[1]);
      });
    }
    return result;
  },
};
