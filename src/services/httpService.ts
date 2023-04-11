import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

axios.interceptors.response.use(
  (res) => res,
  (error) => {
    const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;

    if (!expectedError) {
      console.error('Sorry! There was a problem with your request');
    }

    return Promise.reject(error);
  }
);

const http = {
  get: axios.get,
};

export default http;
