'use strict';

const migrator = require('./migrator.js');

module.exports = function (DAL, cb) {
  const migrationOptions = {
    setDbVersion: setDbVersion,
    getDbVersion: getDbVersion,
    migrations: [
      // require('./scripts/v001.js')(DAL)
    ],
    done: cb
  };

  migrator(DAL, migrationOptions);
};

function setDbVersion(DAL, v) {
  return DAL.settings.create().then(() => {
    return DAL.settings.update({
      name: 'version',
      value: v
    });
  }).then((res) => {
    return res && res.version;
  });
}

function getDbVersion(DAL) {
  return DAL.settings.create().then(() => {
    return DAL.settings.getByName('version');
  }).then((res) => {
    const v = res && res[0] && res[0].value;

    return v || 0;
  });
}