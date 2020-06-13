const fs = require('fs');

const directoryCreate = ({ path }) => new Promise((resolve, reject) => {
  fs.mkdir(path, { recursive: true }, (error) => {
    if (error && error.code !== 'EEXIST') {
      reject(error);
    } else {
      resolve();
    }
  });
});

const directoryExists = ({ path }) => new Promise((resolve) => {
  fs.stat(path, (error) => { resolve(error === null); });
});

const directoryRemove = ({ path }) => new Promise((resolve, reject) => {
  fs.rmdir(path, { recursive: true }, (error) => {
    if (error) {
      reject(error);
    } else {
      resolve();
    }
  });
});

const fileCreate = ({ data, path }) => new Promise((resolve, reject) => {
  fs.writeFile(path, data, (error) => {
    if (error) {
      reject(error);
    } else {
      resolve();
    }
  });
});

const fileExists = directoryExists;

const fileRead = ({ path }) => new Promise((resolve, reject) => {
  fs.readFile(path, { encoding: 'utf-8' }, (error, data) => {
    if (error) {
      reject(error);
    } else {
      resolve(data);
    }
  });
});

module.exports = {
  directoryCreate,
  directoryExists,
  directoryRemove,
  fileCreate,
  fileExists,
  fileRead,
};
