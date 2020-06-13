const http = require('../shared/http');

const getProjectLocalizations = require('./get-project-localizations');

jest.mock('../shared/http');

beforeAll(() => {
  getProjectLocalizations({ apiKey: 'apiKey', format: 'format', language: 'language' });
});

test('Builds the http request successfully', () => {
  expect(http).toHaveBeenCalledWith({
    headers: { 'Accept-Language': 'language', Authorization: 'Bearer apiKey' },
    method: 'GET',
    params: { format: 'format' },
    url: '/locales/items',
  });
});
