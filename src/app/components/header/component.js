(function (angular) {
  'use strict';

  var app = angular.module('lmsNg');

  app.component('lmsHeader', {
    templateUrl: 'app/components/header/tpl.html',
    controller: ctrl,
    controllerAs: 'vm'
  });

  ctrl.$inject = [];
  function ctrl() {
    // var vm = this;
  }
})(angular);