const http = require('../shared/http');

module.exports = ({ apiKey, format, language }) => http({
  headers: { 'Accept-Language': language, Authorization: `Bearer ${apiKey}` },
  method: 'GET',
  params: { format },
  url: '/locales/items',
});
