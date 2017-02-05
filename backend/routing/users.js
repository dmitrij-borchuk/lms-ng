module.exports = function (server, DAL) {
  'use strict';
  const Boom = require('Boom');

  /**
   * @api {get} /api/users Request Users list
   * @apiName GetUsers
   * @apiGroup Users
   *
   * @apiSuccess {Object[]} profiles       List of user profiles.
   * @apiSuccess {String}   profiles.name  User name.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     [{
   *       "name": "John"
   *     }]
   */
  server.route({
    method: 'GET',
    path: '/api/users',
    config: {
      // auth: 'simple',
      // plugins: {
      //   hapiRouteAcl: {
      //     permissions: ['users:read']
      //   }
      // },
      handler: function (request, reply) {
        DAL.users.getAll().then((docs) => {
          reply(docs);
        }).catch((err) => {
          reply(Boom.badImplementation(err));
        });
      }
    }
  });

};