const axios = require('axios');

module.exports = axios.create({
  baseURL: 'https://api.mundophrase.com/v1',
});
