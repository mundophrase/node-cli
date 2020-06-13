module.exports = (response) => JSON.stringify(
  response
    .localeItemValues
    .reduce(
      (accumulator, { key, value }) => ({ ...accumulator, [key]: value }),
      {},
    ),
  null,
  2,
);
