module.exports.init = function (server, DAL) {
  'use strict';

  const path = require('path');
  const fs = require('fs');

  server.route({
    method: 'GET',
    path: '/{param*}',
    config: {
      state: {
        parse: true,
        failAction: 'log'
      },
      handler:  function (request, reply) {
        let fileName = path.resolve(__dirname, './public/' + request.params.param);
        let indexPath = path.resolve(__dirname, './public/index.html');

        fs.stat(fileName, function(err, stat) {
          if(err == null) {
            reply.file(fileName);
          } else {
            reply.file(indexPath);
          }
        });
      }
    }
  });

  require('./routing/users.js')(server, DAL);
};