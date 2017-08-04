
"use strict";
/**
 * Storing multiple constant values inside of an object
 * Keep in mind the values in the object mean they can be modified
 * Which makes no sense for a constant, use wisely if you do this
 */

var app = angular.module('retailerStock', ['ui.router', 'ngStorage', 'ngCookies', 'oitozero.ngSweetAlert', 'ui.bootstrap', 'satellizer',
    'ngAnimate', 'ngMessages'/*,'ngFileUpload'*/,'toastr' /*,'chart.js' ,'angularMoment'*/, 'pubnub.angular.service'])
        .constant({
          'SERVER_URL': (location.hostname === "localhost" || location.hostname === "127.0.0.1") ? 'http://localhost:3500/' : 'https://retailerstock.herokuapp.com/'

});

app.run(['$rootScope', 'SERVER_URL', '$templateCache', 'Pubnub',
  function($rootScope, SERVER_URL, $templateCache, Pubnub) {

    $rootScope.TEMPLATE_URL = SERVER_URL+'views/';
    $rootScope.IMG_URL      = SERVER_URL+'images/';
    $rootScope.FILE_URL     = SERVER_URL+'files/';

    var clearTemplateCache = function () {
      $templateCache.removeAll();
    };
    

    $rootScope.$on('$stateChangeStart', clearTemplateCache);


    /* PubNub Configurations
     ----------------------------------------------*/

    Pubnub.init({
      publish_key: 'pub-c-c60e55f5-a924-4683-a47f-e96a7b7ce469',
      subscribe_key: 'sub-c-554fc7be-63a6-11e7-898a-02ee2ddab7fe',
      ssl: true
    });

}]);


