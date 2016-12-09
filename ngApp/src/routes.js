
'use strict';
// Storing multiple constant values inside of an object
// Keep in mind the values in the object mean they can be modified
// Which makes no sense for a constant, use wisely if you do this


app.config(['$stateProvider', '$urlRouterProvider', 'SERVER_URL', '$qProvider',
  function($stateProvider, $urlRouterProvider, SERVER_URL, $qProvider) {

    $qProvider.errorOnUnhandledRejections(false);

    const TEMPLATE_URL = SERVER_URL+'views/';

    $urlRouterProvider.when("", "/login");
    $urlRouterProvider.when("/", "/login");
    $urlRouterProvider.otherwise("/404");


    $stateProvider.
      state('login', {
        url: '/login',
        templateUrl: TEMPLATE_URL+'login.html',
        controller: 'authCtrl',
        resolve: {
          checkPermission:function($q,$api,$state, $rootScope, $msg) {  var deferred = $q.defer();
            $api.isAuthorized('dashboard').success(function (res, status) { deferred.reject();
                $rootScope.authSuccess = $rootScope.authWarning = $rootScope.authError = false; $rootScope.authInfo = $msg.ALREADY_LOGIN;
                $state.go('home.dashboard');
            });
          }
        }

      }).state('home', {

        resolve: {
          checkPermission:function($q,$api,$state, $msg, $rootScope) {
            var deferred = $q.defer();
            $api.isAuthorized('dashboard').error(function (res, status) { deferred.reject();
                $rootScope.authSuccess = $rootScope.authWarning = $rootScope.authError = false; $rootScope.authInfo = $msg.LOGIN_REQUIRE;
                if(status === 401) $state.go('login'); if(status === 403) $state.go('403'); if(status === 500) $state.go('500');
            });
          }
        },
        templateUrl: TEMPLATE_URL+'home.html',
        controller: function($rootScope) {
          $rootScope.bodyClass = "nav-md";
        }

      }).state('home.dashboard', {
        url: '/dashboard',
        controller:'dashboardCtrl',
        resolve: {
          checkPermission:function($q, $api, $state, $rootScope) {
            var deferred = $q.defer();
            $api.isAuthorized('dashboard').success(function (res, status) { deferred.resolve(res);
                if(status === 200) $rootScope.user = res.response; 
            }).error(function (res, status) { deferred.reject();
                if(status === 401) $state.go('login'); if(status === 403) $state.go('403'); if(status === 500) $state.go('500');
            });
          }
        },        
        templateUrl: TEMPLATE_URL+'dashboard.html'

      }).state('home.profile', {
        url: '/profile',
        controller:'profileCtrl',
        resolve: {
          checkPermission:function($q, $api, $state, $rootScope) {
            var deferred = $q.defer();
            $api.isAuthorized('profile').success(function (res, status) { deferred.resolve(res);
              if(status === 200) $rootScope.user = res.response; 
            }).error(function (res, status) { deferred.reject();
              if(status === 401) $state.go('login'); if(status === 403) $state.go('403'); if(status === 500) $state.go('500');
            });
          }
        },
        templateUrl: TEMPLATE_URL+'profile.html'

      }).state('home.members', {
        url: '/members',
        controller:'membersCtrl',
        resolve: {
          checkPermission:function($q, $api, $state, $rootScope) {
            var deferred = $q.defer();
            $api.isAuthorized('members').success(function (res, status) { deferred.resolve(res);
              if(status === 200) $rootScope.user = res.response; 
            }).error(function (res, status) { deferred.reject();
              if(status === 401) $state.go('login'); if(status === 403) $state.go('403'); if(status === 500) $state.go('500');
            });
          }
        },
        templateUrl: TEMPLATE_URL+'members.html'

      }).state('home.setting', {
        url: '/setting',
        controller:'profileCtrl',
        resolve: {
          checkPermission:function($q, $api, $state, $rootScope) {
            var deferred = $q.defer();
            $api.isAuthorized('profile').success(function (res, status) { deferred.resolve(res);
              if(status === 200) $rootScope.user = res.response; 
            }).error(function (res, status) { deferred.reject();
              if(status === 401) $state.go('login'); if(status === 403) $state.go('403'); if(status === 500) $state.go('500');
            });
          }
        },
        templateUrl: TEMPLATE_URL+'setting.html'

    }).state('home.pricetable', {
      url: '/pricetable',
      controller:'shoppingCtrl',
      resolve: {
        checkPermission:function($q, $api, $state, $rootScope) {
          var deferred = $q.defer();
          $api.isAuthorized('shop').success(function (res, status) { deferred.resolve(res);
            if(status === 200) $rootScope.user = res.response;
          }).error(function (res, status) { deferred.reject();
            if(status === 401) $state.go('login'); if(status === 403) $state.go('403'); if(status === 500) $state.go('500');
          });
        }
      },
      templateUrl: TEMPLATE_URL+'pricing_tables.html'

    }).state('home.messanger', {
      url: '/chat',
      controller:'chatCtrl',
      resolve: {
        checkPermission:function($q, $api, $state, $rootScope) {
          var deferred = $q.defer();
          $api.isAuthorized('chat').success(function (res, status) { deferred.resolve(res);
            if(status === 200) $rootScope.user = res.response;
          }).error(function (res, status) { deferred.reject();
            if(status === 401) $state.go('login'); if(status === 403) $state.go('403'); if(status === 500) $state.go('500');
          });
        }
      },
      templateUrl: TEMPLATE_URL+'messanger.html'
    })











      //  404 Not Found Exception
      .state('404', {
        url : '/404',
        templateUrl: TEMPLATE_URL+'page_404.html',
        controller: function($scope, $rootScope) {
          $rootScope.bodyClass = 'nav-md';
        }

      //  403 Unauthorized Exception
      }).state('403', {
        url : '/403',
        templateUrl: TEMPLATE_URL+'page_403.html',
        controller: function($scope, $rootScope, $q) {
          $rootScope.bodyClass = 'nav-md'; $q.defer().reject();
        }

      //  500 Internal Server Error Exception
      }).state('500', {
        url : '/500',
        templateUrl: TEMPLATE_URL+'page_500.html',
        controller: function($scope, $rootScope, $q) {
          $rootScope.bodyClass = 'nav-md'; $q.defer().reject();
        }

      }).state('logout', {
        url : '/logout',
        controller : function($rootScope, $api, $location, $templateCache, $msg) {
          $rootScope.authInfo = $rootScope.authWarning = $rootScope.authError = false; 
          $rootScope.authSuccess = $msg.LOGOUT_SUCCESS;
          $api.exit(); $location.path('/');
        }

      })


  }]);


