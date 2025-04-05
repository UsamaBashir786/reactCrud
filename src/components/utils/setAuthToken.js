// src/utils/setAuthToken.js
import axios from 'axios';

// Set or remove the auth token in the axios headers
const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;