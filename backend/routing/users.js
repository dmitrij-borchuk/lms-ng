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

'use strict';

module.exports = function (server) {

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
        // DAL.users.get(function (err, docs) {
        //   !err ? reply(docs) : reply(JSON.stringify(err));
        // });
        reply([{name: 'User1'}]);
      }
    }
  });

};