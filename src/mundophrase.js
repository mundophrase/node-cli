const yargs = require('yargs');

const get = require('./get');

module.exports = yargs
  .env('MUNDOPHRASE')

  .alias('a', ['api-key', 'apiKey'])
  .describe('a', 'Your MundoPhrase project API key')

  .command(get)
  .demandCommand(1)
  .help('help')
  .usage('Usage: $0 <command> [options]')
  .version(false);
