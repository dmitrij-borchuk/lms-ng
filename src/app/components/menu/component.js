(function (angular) {
  var app = angular.module('lmsNg');

  app.component('lmsMenu', {
    templateUrl: 'app/components/menu/tpl.html',
    controller: ctrl,
    controllerAs: 'vm'
  });

  ctrl.$inject = [];
  function ctrl() {
    // var vm = this;
  }
})(angular);