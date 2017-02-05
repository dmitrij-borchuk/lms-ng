
module.exports = function(DAL) {
  'use strict';
  return {
    version: 1,
    message: 'Created users table',
    script: function (next) {
      DAL.users.createTable().then(() => {
        next();
      }).catch((err) => {
        console.error(err);
      });
    }
  };
};