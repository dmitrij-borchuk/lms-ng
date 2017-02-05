(function() {
  'use strict';

  angular.module('lmsNg').config(config);

  /** @ngInject */
  function config($routeProvider) {
    $routeProvider.when('/login', {
      templateUrl: 'app/auth/loginTpl.html',
      controller: 'authCtrl',
      controllerAs: 'vm'
    });
  }

})();
