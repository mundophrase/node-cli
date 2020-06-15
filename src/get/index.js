const { getProjectLocalizations } = require('../api');
const {
  FORMAT_ANDROID,
  FORMAT_IOS,
  FORMAT_JAVA,
  FORMAT_JSON,
  FORMAT_NET,
  FORMAT_NET_TXT,
} = require('../shared/constants');
const { directoryCreate, fileCreate } = require('../shared/filesystem');

const parseResponse = require('./response-parser');

const buildFilename = ({ format, language, outputDirectory }) => {
  const extensions = {
    [FORMAT_ANDROID]: 'xml',
    [FORMAT_IOS]: '.strings',
    [FORMAT_JAVA]: 'properties',
    [FORMAT_JSON]: 'json',
    [FORMAT_NET]: 'resx',
    [FORMAT_NET_TXT]: 'restxt',
  };
  return `${outputDirectory}/${language}.${extensions[format]}`;
};

module.exports = {
  builder: (yargs) => {
    yargs
      .alias('f', 'format')
      .choices('f', [
        FORMAT_ANDROID,
        FORMAT_IOS,
        FORMAT_JAVA,
        FORMAT_JSON,
        FORMAT_NET,
        FORMAT_NET_TXT,
      ])
      .default('f', FORMAT_JSON)
      .describe('f', 'The output format')

      .alias('l', 'language')
      .array('l')
      .describe('l', 'The IETF language/locale code (ex: en-US)')

      .alias('o', ['output-directory', 'outputDirectory'])
      .default('o', 'mundophrase')
      .describe('o', 'The output directory')

      .demandOption(['a', 'f', 'l'])
      .example('$0 get -f android -l af-ZA -l en-US')
      .help('help');
    return yargs;
  },
  command: 'get [options]',
  describe: 'Get localizations from MundoPhrase',
  handler: async (argv) => {
    await directoryCreate({ path: argv.o });
    argv.l.forEach(async (language) => {
      try {
        const { data, headers } = await getProjectLocalizations({
          apiKey: argv.a,
          format: argv.f,
          language,
        });
        const parsedResponse = parseResponse({ format: argv.f, response: data });
        await fileCreate({
          data: parsedResponse,
          path: buildFilename({
            format: argv.f,
            language: headers['content-language'],
            outputDirectory: argv.o,
          }),
        });
      } catch (error) {
        // throw new Error(`Failed to save file for ${language}: ${error.message}`);
      }
    });
  },
};
