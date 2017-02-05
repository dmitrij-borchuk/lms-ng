module.exports = function(connection){
  'use strict';

  let DAL = {};

  // Users
  DAL.users = require('./users.js')(connection);

  // Settings
  DAL.settings = require('./settings.js')(connection);

  return DAL;
};