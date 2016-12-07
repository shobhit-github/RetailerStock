
'use strict';
// Storing multiple constant values inside of an object
// Keep in mind the values in the object mean they can be modified
// Which makes no sense for a constant, use wisely if you do this
var app = angular.module('retailerStock', ['ui.router', 'ngStorage', 'ngCookies', 'oitozero.ngSweetAlert', 'ui.bootstrap', /*'ui.calendar',
    */'ngAnimate', 'ngMessages'/*,'ngValidate','ngFileUpload', 'angular-confirm','textAngular' ,'chart.js' ,'angularMoment','uiSwitch'*/])
        .constant({
          'SERVER_URI':'http://localhost:3000/'
});

app.run(['$rootScope', '$state', 'SERVER_URI', '$templateCache',
  function($rootScope, $state, SERVER_URI, $templateCache) {

    $rootScope.TEMPLATE_URL = SERVER_URI+'views/';
    $rootScope.IMG_URL      = SERVER_URI+'images/';
    $rootScope.FILE_URL     = SERVER_URI+'files/';

    $rootScope.$on('$viewContentLoaded', function() {
      $templateCache.removeAll();
    });
    $rootScope.$on('$stateChangeStart', function() {
      $templateCache.removeAll();
    });

    $rootScope.$on('loading:progress', function () {
      $rootScope.rootLoader = $rootScope.mainContentLoader = true;
    });
    $rootScope.$on('loading:finish', function () {
      $rootScope.rootLoader = $rootScope.mainContentLoader = false;
    });

}]);
