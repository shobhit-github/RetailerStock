
'use strict';
// Storing multiple constant values inside of an object
// Keep in mind the values in the object mean they can be modified
// Which makes no sense for a constant, use wisely if you do this
var app = angular.module('retailerStock', ['ui.router', 'ngStorage', 'ngCookies', 'oitozero.ngSweetAlert', 'ui.bootstrap', /*'ui.calendar',
    */'ngAnimate', 'ngMessages'/*,'ngValidate','ngFileUpload', 'angular-confirm','textAngular' ,'chart.js' ,'angularMoment','uiSwitch'*/])
        .constant({
        	'HTTP_ROOT':'http://localhost:3000/views/',
          'IMG_DIR':'http://localhost:3000/assets/images/',
          'FILES_DIR':'http://localhost:3000/assets/files/'
});

app.run(['$rootScope', '$state', 'HTTP_ROOT', 'IMG_DIR', 'FILES_DIR', '$templateCache', 
  function($rootScope, $state, HTTP_ROOT, IMG_DIR, FILES_DIR, $templateCache) {

    $rootScope.HTTP_ROOT = HTTP_ROOT;
    $rootScope.IMG_DIR = IMG_DIR;
    $rootScope.FILES_DIR = FILES_DIR;

    $rootScope.$on('$viewContentLoaded', function() {
      $templateCache.removeAll();
    });
    $rootScope.$on('$stateChangeStart', function() {
      $templateCache.removeAll();
    });

    $rootScope.$on('loading:progress', function (){
      $rootScope.rootLoader = $rootScope.mainContentLoader = true;
    });
    $rootScope.$on('loading:finish', function (){
      $rootScope.rootLoader = $rootScope.mainContentLoader = false;
    });

}]);