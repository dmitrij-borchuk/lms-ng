'use strict';

const _ = require('lodash');

module.exports = function (DAL, options) {
  options = options || {};

  const DEBUG = false;

  options.getDbVersion(DAL).then((v) => {
    if (v) {
      versionCb(v);
    } else {
      options.setDbVersion(DAL, 0).then(() => {
        versionCb(0);
      });
    }
  }).catch((err) => {
    console.error(err);
  });

  function versionCb(v) {
    var migrations = fillMigrations(options.migrations || []);

    runAllMigrations(
      migrations,
      parseInt(v, 10),
      DAL,
      function (v) {
        if (!DEBUG) {
          console.info('    DB version: ' + v);
          options.setDbVersion(DAL, v).then(() => {
            options.done();
          });
        } else {
          options.done();
        }
      }
    );
  }

  function fillMigrations(migrations) {
    let mg = {};

    migrations.forEach(function (migration) {
      if (mg[migration.version]) {
        console.error('    Migration with this version already exists.');
      } else {
        mg[migration.version] = migration;
      }
    });

    return mg;
  }

  function runAllMigrations(migrations, currentDbVersion, DAL, doneCallback) {
    var index = currentDbVersion;

    next(migrations, index + 1, DAL, doneCallback);

    function next (migrations, v, DAL, cb) {
      var currentMigration = migrations[v];

      if (currentMigration) {
        runMigration(
          currentMigration.script,
          currentMigration.message,
          _.bind(next, null, migrations, v + 1, DAL, cb)
        );
      } else {
        cb(v - 1, DAL);
      }
    }
  }

  // migrationFunc {function(next)}
  // msg {string}
  // callback {function}
  function runMigration (migrationFunc, msg, callback) {
    migrationFunc(
      _.bind(migrationEnd, null, msg, callback)
    );
  }

  function migrationEnd(msg, cb, err) {
    if (err) {
      console.error('    Error while migrating:');
      console.error(err);
    } else {
      console.info('    Finished: ' + msg);
      cb();
    }
  }
};