module.exports = function () {
  'use strict';

  const Hapi = require('hapi');
  const Promise = require('promise');

  const connectDB = require('./dataProvider.js');
  const config = require('./config.js');
  const migrations = require('./migrations/migrations');

  try {
    startServer(config);
  } catch(err) {
    console.error(err);
  }

  function startServer(config) {
    const server = new Hapi.Server();

    server.connection({
      port: config.server.port
      // routes: {
      //   // TODO: Need to be investigated
      //   cors: {
      //     origin: ['*'],
      //     credentials : true
      //   }
      // }
    });

    connectDB().then( (connection) => {
      return registerDAL(connection);
    }).then(function(DAL) {
      runMigrations(DAL).then(() => {
      //   return registerACL(server);
      // }).then(() => {
        return registerStaticFilesServer(server);
      }).then(() => {
      //   return registerAuth(server, DAL);
      // }).then(() => {
        return registerRouting(server, DAL);
      }).then(() => {
        return registerLoging(server);
      }).then(() => {
        return serverRun(server);
      }).then(() => {
        return showSuccessMessage(server);
      }).catch((err) => {
        console.error(err);
      });
    }).catch((err) => {
      console.error(err || 'Error isn\'t provided');
    });
  }

  function runMigrations(DAL) {
    return new Promise(
      function (resolve, reject) {
        console.info('-| Migrations start');
        migrations(DAL, function () {
          console.info('-| Migrations end');
          resolve();
        });
      }
    );
  }

  function registerStaticFilesServer(server) {
    return new Promise(
      function (resolve, reject) {
        const plugin = require('inert');
        server.register(plugin, function (err) {
          err ? reject() : resolve();
        });
      }
    );
  }

  function registerRouting(server, DAL) {
    const routing = require('./routing');
    routing.init(server, DAL);
  }

  function registerDAL(connection) {
    return require('./dal/dal.js')(connection);
  }

  // function registerACL(server) {
  //   return new Promise(function (resolve, reject) {
  //     require('./acl.js')(server, function(err) {
  //       err ? reject() : resolve();
  //     });
  //   });
  // }

  function showSuccessMessage(server) {
    server.log('info', 'Server running at: ' + server.info.uri);
  }

  function serverRun(server) {
    return new Promise(
      function (resolve, reject) {
        server.start((err) => {
          err ? reject(err) : resolve();
        });
      }
    );
  }

  function registerLoging(server) {
    return new Promise(function (resolve, reject) {
      const Good = require('good');
      server.register({
        register: Good,
        options: {
          reporters: {
            console: [{
              module: 'good-squeeze',
              name: 'Squeeze',
              args: [{
                response: '*',
                log: '*'
              }]
            }, {
              module: 'good-console'
            }, 'stdout']
          }
        }
      }, function (err) {
        err ? reject(err) : resolve();
      });
    });
  }

  // TODO: move to separate file
  // function registerAuth(server, DAL) {
  //   return new Promise(function (resolve, reject) {
  //     const AuthHeader = require('hapi-auth-header');

  //     server.register(AuthHeader, (err) => {
  //       if (err) {
  //         reject();
  //       } else {
  //         server.auth.strategy('simple', 'auth-header', {
  //           validateFunc: function (tokens, callback) {
  //             let request = this;
  //             let tokenName = 'x-biz-token';
  //             let actionsArr;
  //             let rolesArr;
  //             let user;

  //             DAL.users.getUserByToken(tokens[tokenName]).then((res) => {
  //               user = res;

  //               return DAL.roles.getRolesByUserId(user.id);
  //             }).then((roles) => {
  //               let rolesPromisies = roles.map(function(role) {
  //                 return DAL.roles.getRoleById(role.id_role);
  //               });

  //               return Promise.all(rolesPromisies);
  //             }).then((roles) => {
  //               rolesArr = roles.map(function(role) {
  //                 return role.name;
  //               });

  //               let getActionsPromisies = roles.map(function(role) {
  //                 return DAL.actions.getActionsByRoleId(role.id);
  //               });

  //               return Promise.all(getActionsPromisies);
  //             }).then((actions) => {

  //               let actionsId = [];
  //               if (actions.length > 0) {
  //                 actionsId = actions[0].map(function(action) {
  //                   return action.id_action;
  //                 });
  //               }

  //               let actionsPromisies = actionsId.map(function(action) {
  //                 return DAL.actions.getActionById(action);
  //               });

  //               return Promise.all(actionsPromisies);
  //             }).then((actions) => {
  //               actionsArr = actions.map(function(action) {
  //                 return action.name;
  //               });
  //             }).then(() => {
  //               user.roles = rolesArr;
  //               user.actions = actionsArr;

  //               return callback(null, true, user);
  //             }, (err) => {
  //               return callback(null, false, null);
  //             });
  //           }
  //         });
  //         resolve();
  //       }
  //     });
  //   });
  // }
};
