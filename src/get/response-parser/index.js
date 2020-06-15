const { FORMAT_JSON } = require('../../shared/constants');

const json = require('./json');

const identity = (value) => value;

const formatParsersMap = {
  [FORMAT_JSON]: json,
};

module.exports = ({ format, response }) => {
  const formatParser = formatParsersMap[format] || identity;
  return formatParser(response);
};
