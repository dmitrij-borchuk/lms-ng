var merge = require('merge');

var userConfig;

try {
  userConfig = require('./userConfig.js');
} catch (ex) {
  userConfig = {};
}

var config = {
  db: {
    dbName: '',
    host: '',
    user: '',
    password: ''
  },
  server: {
    port: 80
  },
  mail: {
    host: '',
    port: null,
    user: '',
    pass: ''
  }
};

module.exports = merge(config, userConfig);