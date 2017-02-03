'use strict'

module.exports = function(connection){
  let DAL = {};

  // Users
  DAL.users = require('./users.js')(connection);

  // Settings
  DAL.settings = require('./settings.js')(connection);

  return DAL;
};