
"use strict";
/**
 * Storing multiple constant values inside of an object
 * Keep in mind the values in the object mean they can be modified
 * Which makes no sense for a constant, use wisely if you do this
 */

var app = angular.module('retailerStock', ['ui.router', 'ngStorage', 'ngCookies', 'oitozero.ngSweetAlert', 'ui.bootstrap', 'satellizer',
    'ngAnimate', 'ngMessages'/*,'ngFileUpload','textAngular' ,'chart.js' ,'angularMoment','uiSwitch'*/])
        .constant({
          'SERVER_URL': (location.hostname === "localhost" || location.hostname === "127.0.0.1") ? 'http://localhost:3000/' : 'https://retailerstock.herokuapp.com/'

});

app.run(['$rootScope', 'SERVER_URL', '$templateCache',
  function($rootScope, SERVER_URL, $templateCache) {

    $rootScope.TEMPLATE_URL = SERVER_URL+'views/';
    $rootScope.IMG_URL      = SERVER_URL+'images/';
    $rootScope.FILE_URL     = SERVER_URL+'files/';

    var clearTemplateCache = function () {
      $templateCache.removeAll();
    };
    

    $rootScope.$on('$stateChangeStart', clearTemplateCache);

}]);
