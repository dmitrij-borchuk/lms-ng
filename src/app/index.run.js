(function() {
  'use strict';

  angular
    .module('lmsNg')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
