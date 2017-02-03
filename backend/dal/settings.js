'use strict';

const Promise = require('promise');

module.exports = function(connection) {
  return {
    create: () => {
      return new Promise((resolve, reject) => {
        let request1 = [
          'CREATE TABLE ',
            'IF NOT EXISTS ',
            'settings ',
            '(',
              'name varchar(255) NOT NULL UNIQUE, ',
              'value varchar(255) NOT NULL',
            ')'
        ].join('');

        let request2 = [
          'INSERT IGNORE INTO settings ',
          '(name, value) ',
          'VALUES ("version", "0")'
        ].join('');

        connection.query(request1, function() {
          connection.query(request2, (err, response) => {
            err ? reject(err) : resolve(response);
          });
        });
      });
    },
    get: () => {
      return new Promise((resolve, reject) => {
        connection('SELECT * FROM settings', (err, response) => {
          err ? reject(err) : resolve(response);
        });
      });
    },
    getByName: (searchName) => {
      return new Promise((resolve, reject) => {
        let request = [
          'SELECT value FROM settings ',
          'WHERE name = '
        ].join('') + '"' + searchName + '"';

        return connection.query(request, (err, response) => {
          err ? reject(err) : resolve(response);
        });
      });
    },
    update: (name, value) => {
      return new Promise((resolve, reject) => {
        let request = 
          'UPDATE settings' + 
          ' SET' +
          ' value = "' + value + '"' +
          ' WHERE name = "' + name + '"';
        return connection.query(request, (err, response) => {
          err ? reject(err) : resolve(response);
        });
      });
    }
  };
}
