const { getProjectLocalizations } = require('./api');
const {
  directoryCreate,
  directoryRemove,
  fileExists,
  fileRead,
} = require('./shared/filesystem');

const mundophrase = require('./mundophrase');

jest.mock('./api');

const executeCommand = (command) => new Promise((resolve) => {
  mundophrase.parse(command, (error, argv, output) => {
    // this is just some arbitrary number
    // anything that waits longer than the immediate promise is fine
    setTimeout(() => resolve(output), 1000);
  });
});

beforeAll(async () => {
  await directoryCreate({ path: './tmp' });
});

afterAll(async () => {
  await directoryRemove({ path: './tmp' });
});

describe('get', () => {
  describe('Single language, android', () => {
    beforeAll(async () => {
      getProjectLocalizations.mockResolvedValue({
        data: 'data',
        headers: { 'content-language': 'en-US' },
      });
      await executeCommand('get -a API_KEY -f android -l en-US -o ./tmp/test');
    });

    test('Creates the file', async () => {
      const data = await fileRead({ path: './tmp/test/en-US.xml' });
      expect(data).toBe('data');
    });
  });

  describe('Multiple languages, json', () => {
    const localeItemValues = [
      { key: 'key_one', value: 'value_one' },
      { key: 'key_two', value: 'value_two' },
    ];
    beforeAll(async () => {
      getProjectLocalizations
        .mockResolvedValueOnce({
          data: { localeItemValues },
          headers: { 'content-language': 'af-ZA' },
        })
        .mockResolvedValue({
          data: { localeItemValues },
          headers: { 'content-language': 'en-US' },
        });
      await executeCommand('get -a API_KEY -f json -l af-ZA -l en-US -o ./tmp/test');
    });

    test('Creates first file', async () => {
      const data = await fileRead({ path: './tmp/test/af-ZA.json' });
      expect(data).toBe(JSON.stringify({ key_one: 'value_one', key_two: 'value_two' }, null, 2));
    });

    test('Creates second file', async () => {
      const data = await fileRead({ path: './tmp/test/en-US.json' });
      expect(data).toBe(JSON.stringify({ key_one: 'value_one', key_two: 'value_two' }, null, 2));
    });
  });

  describe('Failure', () => {
    beforeAll(async () => {
      getProjectLocalizations.mockRejectedValue(new Error('API failed'));
      await executeCommand('get -a API_KEY -f ios -l en-US -o ./tmp/test');
    });

    test('Does not create the file', async () => {
      const exists = await fileExists({ path: './tmp/test/en-US.strings' });
      expect(exists).toBe(false);
    });
  });
});
