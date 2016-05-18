/* eslint strict: 0*/
'use strict';

const fs = require('fs');
const Promise = require('bluebird');

module.exports.readMovieTitle = (path) => {
  return new Promise((resolve, reject) => {
    if (!path) {
      reject(new Error('Invalid readMovieTitle input'));
    }
    const rs = fs.createReadStream(path, { encoding: 'utf8' });
    let acc = '';
    let pos = 0;
    let index;

    rs.on('data', (chunk) => {
      index = chunk.indexOf('\n');
      acc += chunk;
      index !== -1 ? rs.close() : pos += chunk.length;
    })
    .on('close', () => {
      const movieTitle = acc.slice(0, pos + index);
      resolve(movieTitle);
    })
    .on('error', (err) => {
      reject(new Error(err));
    });
  });
};

module.exports.read = (path) => {
  return new Promise((resolve, reject) => {
    if (!path) {
      reject(new Error('Invalid read input'));
    }
    const rs = fs.createReadStream(path, { encoding: 'utf8' });
    let movieScript = '';

    rs.on('data', (chunk) => {
      movieScript += chunk;
    })
    .on('close', () => {
      resolve(movieScript);
    })
    .on('error', (err) => {
      reject(new Error(err));
    });
  });
};

module.exports.clearTemp = (path) => {
  return new Promise((resolve, reject) => {
    if (!path) {
      reject(new Error('Invalid clearTemp input'));
    }
    fs.unlink(path, (err) => {
      if (err) {
        reject(new Error(err));
      }
      resolve(true);
    });
  });
};
