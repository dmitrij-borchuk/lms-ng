(function() {
  'use strict';

  angular.module('lmsNg').config(config);

  /** @ngInject */
  function config($routeProvider) {
    $routeProvider.when('/users', {
      templateUrl: 'app/users/tpl.html',
      controller: 'usersCtrl',
      controllerAs: 'vm'
    });
  }

})();
