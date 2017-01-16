
"use strict";

var app = angular.module('retailerStock', ['ui.router', 'ngStorage', 'ngCookies', 'oitozero.ngSweetAlert', 'ui.bootstrap', 'satellizer',
    'ngAnimate', 'ngMessages'/*,'ngValidate','ngFileUpload', 'angular-confirm','textAngular' ,'chart.js' ,'angularMoment','uiSwitch'*/])
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


"use strict";


app.config(function($httpProvider, $authProvider) {

	$httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.headers.delete = { "Content-Type": "application/json;charset=utf-8" };
    $authProvider.facebook({
        clientId: '1816822548595817',
        url: '/api/facebook'
    });

    $authProvider.google({
        clientId: '272365508948-potcnrtdqvkkcmd5nnjri8v31ubm0gj9.apps.googleusercontent.com',
        url: '/api/google'
    });

    $authProvider.linkedin({
        clientId: '81ectx5uetkc8v',
        url: '/api/linkedin'
    });


});


"use strict";

app.controller('authCtrl', ['$rootScope', '$scope', '$api', '$location', '$token', '$timeout',
	function authCtrl($rootScope, $scope, $api, $location, $token, $timeout) {
		
	$rootScope.bodyClass = "login";
	$scope.loginSec = true;

	$scope.displaySection = function(secName) {
		if(secName == 'register') { $scope.forgetSec = $scope.loginSec = false; $scope.registerSec = true; } 
		if(secName == 'login') { $scope.forgetSec = $scope.registerSec = false; $scope.loginSec = true;  }
		if(secName == 'forget_pass') { $scope.registerSec = $scope.loginSec = false; $scope.forgetSec = true; } 
	};

	$scope.loginUser = function(users) {

		$scope.authSuccess = $scope.authError = $scope.authWarning = $scope.authInfo = false;

	    var error = function(response, status) {
	      $scope.authError = response.data.message;
	    };

		$api.authenticate(users).then( function(response, status) { console.log(response);
	    	$token.saveToAllStorage(response.data.token);
	    	$scope.authSuccess = response.data.message;

	    	$timeout(function() { $location.path('dashboard'); }, 2000);
	    }, error );
	};

	$scope.resetPassword = function(users) {

		$scope.authError = $scope.authSuccess = $scope.authWarning = $scope.authInfo = false;

	    var error = function(response, status) {
			$scope.authError = response.data.message;
	    };

		$api.resetPassword(users).then( function(response, status) {
			$scope.authSuccess= response.data.message;
	    }, error );
	}






}]);

"use strict";

app.controller('chatCtrl', ['$scope', '$socket',
	function chatCtrl($scope, $socket) {

		$scope.joinUser = function (user_id) {
		};

		$scope.sendMessage = function (data) {
		};
		

}]);

"use strict";

app.controller('dashboardCtrl', ['$rootScope', '$scope', '$api', '$state',
	function dashboardCtrl($rootScope, $scope, $api, $state) {
	    $scope.$on('$stateChangeSuccess', dashboardUtilities);


	}
]);

"use strict";


app.controller('headerCtrl', ['$rootScope', '$scope', '$api', 
	function headerCtrl($rootScope, $scope, $api) {
				
	}
]);

"use strict";

app.controller('membersCtrl', ['$rootScope', '$scope', '$api', '$state', '$sweetAlert', '$msg',
	function membersCtrl($rootScope, $scope, $api, $state, $sweetAlert, $msg) {
		$scope.$on('$stateChangeSuccess', dashboardUtilities);

		var pageParams = function(data) {
			return {	
				'module_name': 'members',
				'paging_info': { 'page': parseInt(data.currentPage), 'sort': data.sort || { 'created_at': -1 }, 'limit': parseInt(data.limit)	}
			}
		};
		var pagination = {
			'limit': 10,
			'currentPage': 1,
			'maxSize': 10
		};
		var postData = new Object();
		getMembers(pagination);
		function getMembers(pageData) {

			var params = pageParams(pageData);

			if(pageData.search) params.search = pageData.search; 
			$api.findMember( params ).then( function(res, status) {
				$scope.records	= res.data.data.docs;
				$scope.pagination = {
					'limit': res.data.data.limit,
					'totalItems': res.data.data.total,
					'currentPage': (res.data.data.page > res.data.data.pages) ? res.data.data.pages : res.data.data.page,
					'numPages': res.data.data.pages,
					'maxSize': pageData.maxSize
				};
				if(pageData.search) $scope.pagination.search = pageData.search ; 
				if(res.data.data.total == 0) $scope.pagination.message = res.data.message;
				
			}, function(res, status) {
				if(res.status == 401) $state.go('login');
				if(res.status == 500) $state.go('500');
				
			});

		}


		$scope.deleteMember = function(data) {
			$sweetAlert.confirm("Confirmation", $msg.CONFIRM_DELETE, function(res) {
				if(res) {
					$api.removeMember(data).then( function(res, status) {
						if(res.data.success==true) getMembers($scope.pagination);
					}, $api.handleError );
				}
			});
		};


		$scope.paginateMembers = function(pageParams) {
			getMembers(pageParams);
		}

		
	}
]);

"use strict";


app.controller('profileCtrl', ['$rootScope', '$scope', '$api', '$state', '$sweetAlert', '$msg', 
	function profileCtrl($rootScope, $scope, $api, $state, $sweetAlert, $msg) {
		$scope.$on('$stateChangeSuccess', dashboardUtilities);
		$scope.createProfile = function(data) {

			var error = function(res, status) {
				console.log(res);
			}

		};
		$scope.updateProfile = function(data) {

			var success = function(res, status) {
				$sweetAlert.success("Success", res.data.message);
			};

			$api.updateUserProfile({
				_id:data._id,
				fisrtname:data.firstname,
				lastname:data.lastname,
				phone:data.phone,
				email:data.email,
				username:data.username
			}).then( success , function(res) { 
				$api.handleError(res);
			});

		};
		$scope.changePassword = function(data) {

		}

		
	}
]);

"use strict";


app.controller('shoppingCtrl', ['$rootScope', '$scope', '$api', '$window', '$sweetAlert',
	function shoppingCtrl($rootScope, $scope, $api, $window, $sweetAlert) {

		var error = function(res, status) {
			$api.handleError(res);
		};

		$scope.makePayment = function () {
			$api.createPayment().then(function (res) {
				window.open(res.data.pay_url, "Payment", "width=650,height=800,left="+(screen.width/2 - 650/2)+",top="+(screen.height/2 - 800/2));
			}, error );
		};

		$scope.executePayment = function () {
			$api.makePayment().then(function (res) { console.log(res);
				if(res.data.status)	$sweetAlert.success("Success", res.data.message);
			}, error );
		}
	}
]);

"use strict";


app.controller('sidebarCtrl', ['$rootScope', '$scope', '$api', 
	function dashboardCtrl($rootScope, $scope, $api) {
				
	}
]);

"use strict";

app.directive('splashScreen',
  function($rootScope) {
    return {
      restrict:'A',
      link: function () {
        $rootScope.$on('$stateChangeStart', function() { $rootScope.loader = true; });
        $rootScope.$on('$stateChangeSuccess', function () {
          setTimeout(function () { $rootScope.$apply(function () {
            $rootScope.loader = false;
          }) }, 1200);
        });
      },
      template: `
          <div class="splash-title">
            <h1>Gentellela </h1> <p>Please wait while we are loading page content. </p>
            <div class="spinner">
                <div class="rect1"></div>
                <div class="rect2"></div>
                <div class="rect3"></div>
                <div class="rect4"></div>
                <div class="rect5"></div>
            </div>
          </div>
      `
    };
});

app.directive('selectLimit', 
  function () {

    return {
      restrict: 'E',
      scope: {
        elemData  : '=',
        elemSend : '&'
      },
      link : function($scope, $element, $attrs) {
      },
      template: `
          <div class="col-sm-6"> 
            <div class="dataTables_length" id="datatable-keytable_length">
              <label class="table-label"> Show 
                <select 
                  ng-model="elemData.limit"
                  class="form-control select-limit input-sm"
                  ng-change="elemSend(elemData);"
                  ng-init="list = [10, 25, 50, 100, 500]"
                  ng-options="x for x in list" >
                </select>
                <span style="margin-left:0px;">entries</span>
              </label>
            </div>
          </div>
      `
    };

});

app.directive('searchField', 
  function () {

    return {
      restrict: 'E',
      scope: {
        elemData  : '=',
        elemSend : '&'
      },
      link : function($scope, $element, $attrs) {
      },
      template: `      
        <div class="col-sm-4 pull-right">
          <div id="datatable-keytable_filter" class="dataTables_filter">
            <label class="table-label">Search: 
                <input ng-enter="elemSend(elemData)" ng-model="elemData.search.keyword" type="search" class="form-control search-field input-sm" placeholder="enter keywords..." />
            </label>
          </div>
        </div>
      `
    };

});

app.directive('checkBox', 
  function () {

    return {
      restrict: 'E',
      scope: {
        allRecords: '=',
        data: '='
      },
      link: function($scope, $element, $attrs) {
      },
      controller: function($scope, $rootScope) {

        $scope.selectAll = function() {
          $rootScope.checkedArray = new Array(); 
          angular.forEach($scope.allRecords, function(value, index) {
            if($scope.allRecords.isCheckAll) {
              $rootScope.checkedArray.push(value._id); value.selected = true;
            } else { value.selected = false; }
          })
        };
        $scope.selectOne = function() { 
          $rootScope.checkedArray = new Array(); 
          angular.forEach($scope.allRecords, function(value, index) {
            if($scope.allRecords[index].selected) { $rootScope.checkedArray.push(value._id); }
          });
          if($rootScope.checkedArray.length == 0) $scope.allRecords.isCheckAll = false ;
        }
      },
      template: function($elements, $attrs) {

        return  $attrs.$attr.checkAll
          ? `<input type="checkbox" ng-model="allRecords.isCheckAll" ng-change="selectAll();" class="flat">`
          : `<input type="checkbox" ng-checked="allRecords.isCheckAll" ng-model="data.selected" ng-change="selectOne();" value="{{data._id}}" class="flat" /> `;
      }
    };

});

app.directive('currentPageInfo', 
  function () {

    return {
      restrict: 'E',
      scope: {
        elemData  : '='
      },
      link : function($scope, $element, $attrs) {
      },
      template: `      
        <div class="col-sm-4">
          <div style="padding-top:5px;" class="dataTables_info" id="datatable_info" role="status" aria-live="polite">Showing {{ elemData.limit * (elemData.currentPage - 1 ) + 1 }} to {{ elemData.limit * (elemData.currentPage - 1 ) + elemData.limit }} of {{ elemData.totalItems }} entries</div>
        </div>
      `
    };

});

app.directive('goToPage', ['$api', '$msg',
  function ($api, $msg) {

    return {
      restrict: 'E',
      scope: {
        elemData  : '=',
        elemSend  : '&'
      },
      link : function($scope, $element, $attrs) {
        var numField = angular.element($element[0].querySelector('input'));
        
        numField.on('keyup', function(e) {
          if(0 == this.value || "" == this.value) { this.value = $scope.elemData.currentPage = 1; }
          if(this.value > $scope.elemData.numPages) { this.value = $scope.elemData.currentPage = $scope.elemData.numPages; }
        })
      },
      template: `      
        <div class="col-sm-2">
          <div class="go-to-div">
            <label class="table-label"> Go to 
              <input ng-enter="elemSend(elemData);" ng-model="elemData.currentPage" type="number" min="1" max="{{ elemData.numPages }}" class="form-control input-sm go-to"> <span> page</span> </label> 
          </div>
        </div>
      `
    };

}]);


app.directive('pagination', 
  function () {

    return {
      restrict: 'E',
      scope: {
        elemData  : '=',
        elemSend  : '&'
      },
      link : function($scope, $element, $attrs) {
      },
      template: `      
        <div class="col-sm-6">
          <div class="dataTables_paginate paging_simple_numbers" id="datatable_paginate">
            <ul uib-pagination 
                template-url="views/elements/pagination.html"
                total-items="elemData.totalItems"
                ng-model="elemData.currentPage"
                max-size="elemData.maxSize"
                style="margin:0;" class="pagination"
                rotate="false"
                num-pages="elemData.numPages"
                items-per-page="elemData.limit"
                ng-change="elemSend(elemData)" >
            </ul>
          </div>
        </div>
      `
    };

});               

"use strict";


app.directive('ngEnter', function () {
  return function (scope, element, attrs) {
    element.bind("keydown keypress", function (event) {
      if(event.which === 13) {
        scope.$apply(function (){
          scope.$eval(attrs.ngEnter);
        });

        event.preventDefault();
      }
    });
  };
});



"use strict";



app.directive('socialAuth', 
  function () {

    var controller = function($scope, $rootScope, $auth, $location, $timeout, $token) {

        $scope.socialAuth = function(provider) {

            $scope.authSuccess = $scope.authError = $scope.authWarning = $scope.authInfo = false;

            $auth.authenticate(provider).then(function(response, status) {
                $token.saveToAllStorage(response.data.token);
                $scope.authSuccess = response.data.message;

                $timeout(function() { $location.path('dashboard'); }, 2000);
            });
        };
    };

    var linking = function ($scope, $element, $attr) {

    };

    var template = function($elements, $attrs) {

      if($attrs.hasOwnProperty('facebook')) var btns = `<button type="button" ng-click="socialAuth('facebook');" class="btn btn-round btn-facebook"><i class="fa fa-facebook"></i></button>`;
      if($attrs.hasOwnProperty('twitter')) btns += `<button type="button" ng-click="socialAuth('twitter');" class="btn btn-round btn-twitter"><i class="fa fa-twitter"></i></button>`;
      if($attrs.hasOwnProperty('google')) btns += `<button type="button" ng-click="socialAuth('google');" class="btn btn-round btn-google"><i class="fa fa-google"></i></button>`;
      if($attrs.hasOwnProperty('linkedin')) btns += `<button type="button" ng-click="socialAuth('linkedin');" class="btn btn-round btn-linkedin"><i class="fa fa-linkedin"></i></button>`;

      return `<div class="social-login-sec">`+btns+`</div>`;
    };

    return {
      restrict: 'E',
      link: linking,
      controller: controller,
      template: template
    };

});


"use strict";


app.config(['$stateProvider', '$urlRouterProvider', 'SERVER_URL',
  function($stateProvider, $urlRouterProvider, SERVER_URL) {

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

    }).state('payment', {
      url: '/processPayment',
      controller: function ($api, $location, $window, $sweetAlert) {
        var queryString = $location.search();
        $api.makePayment({paymentId: queryString.paymentId, payerId: queryString.PayerID}).then(function (res) {
          if(res.data.status) {
            $sweetAlert.success("Success", res.data.message);
          } else { $sweetAlert.error("Oops!", res.data.message); }
        }, function (res) { $sweetAlert.error("Oops!", res.data.message); });
      },
      template:`<div splash-screen class="splash"></div>`

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
      .state('404', {
        url : '/404',
        templateUrl: TEMPLATE_URL+'page_404.html',
        controller: function($scope, $rootScope) {
          $rootScope.bodyClass = 'nav-md';
        }
      }).state('403', {
        url : '/403',
        templateUrl: TEMPLATE_URL+'page_403.html',
        controller: function($scope, $rootScope, $q) {
          $rootScope.bodyClass = 'nav-md'; $q.defer().reject();
        }
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




"use strict";

app.service('$api', ['$http', '$token', '$rootScope', '$sweetAlert', '$msg', 'SERVER_URL',
  function ($http, $token, $rootScope, $sweetAlert, $msg, SERVER_URL) {

  const SERVER_URI = SERVER_URL+'api/';

  var config = {
    headers: { 'Authorization': $token.getFromCookie() || $token.getFromLocal() || $token.getFromSession() }
  };

  this.isAuthorized = function(module_name) {
    return $http.get(SERVER_URI+'check_auth', {
      headers: { 'Authorization': $token.getFromCookie() || $token.getFromLocal() || $token.getFromSession() } ,
      params : { 'module_name': module_name }
    });
  };
  
  this.authenticate = function(data) {
    return $http.post(SERVER_URI+'login', data);
  };

  this.resetPassword = function(email) {
    return $http.post(SERVER_URI+'reset_password', email);
  };
 
  this.exit = function() {
    return $token.deleteFromAllStorage();
  };

  this.findMember = function(params) {
    config.params = params;
    if(params.search) {
      return $http.post(SERVER_URI+'all_users', params.search, config);
    }
    return $http.get(SERVER_URI+'all_users', config);
  };

  this.removeMember = function(data) {

    return $http.delete(SERVER_URI+'remove_profile/'+data, config);
  };

  this.updateUserProfile = function(data) {

    return $http.put(SERVER_URI+'update_profile', data, config);
  };

  this.createPayment = function () {

    return $http.get(SERVER_URI+'create_payment', config);
  };

  this.makePayment = function (params) {
    config.params = params;
    return $http.get(SERVER_URI+'execute_payment', config);
  };

  this.getChatList = function (params) {
    config.params = params;
    return $http.get(SERVER_URI+'chat_list', config);
  };

  this.getConversation = function () {

  };







  this.handleError = function(res) {

    switch (res.status) {
      case 400: $sweetAlert.error(res.statusText, $msg.AUTHENTICATION_ERROR); break;
      case 403: $sweetAlert.error(res.statusText, $msg.AUTHENTICATION_ERROR); break;
      case 500: $sweetAlert.error(res.statusText, $msg.INTERNAL_SERVER_ERROR); break;
      case 503: $sweetAlert.error(res.statusText, $msg.SERVICE_UNAVAILABLE); break;
      case 404: $sweetAlert.error(res.statusText, $msg.NOT_FOUND_ERROR); break;
        
      default:  $sweetAlert.error(res.statusText, $msg.INTERNAL_SERVER_ERROR); break;
    }
  };

    


}]);



"use strict";


app.service('$msg', [
	function () {

	return {
		'INTERNAL_SERVER_ERROR'	:	"There was an internal server error, please contact to the website / software administrator !",
		'SERVICE_UNAVAILABLE'	:	"Currently this service is under maintenance, please try after some time !",
		'NOT_FOUND_ERROR'		: 	"There was an error due to requested url not found, please contact to the website / software administrator !",
		'AUTHENTICATION_ERROR'	: 	"There was an error due to unauthorized access from the client end, please contact to the software administrator !",
		'SESSION_EXPIRE'		: 	"Session has been expired !",
		'BAD_REQUEST'			:	"There was bad request due to some technical issue, please try it again !",
		'LOGIN_REQUIRE'			: 	"You've to login to start session again!",
		'ALREADY_LOGIN'			: 	"You're already in session !",
		'LOGOUT_SUCCESS'		: 	"Logout successfully",
		"CONFIRM_DELETE"		: 	"Please make sure once you deleted it you will not be able to recover this imaginary content!",
		"CANCELLED"				: 	"This operation has been cancelled, please try it again if this happened without your concent!"
	};


}]);



"use strict";

app.service('$socket', ['$rootScope', '$sweetAlert', '$msg', 'SERVER_URL',
  function ($rootScope, $sweetAlert, $msg, SERVER_URL) {

  const socket = io.connect(SERVER_URL+'api/chat/');

      
  this.on = function (eventName, callback) {
    socket.on(eventName, function (r) {
      console.log(r);
    })  
  };
    
  this.emit = function (eventName, data, callback) {
    socket.emit(eventName, function (data) {
      
    })
  };


}]);



"use strict";

app.service('$sweetAlert', [ '$timeout', '$window', '$msg',
	function ($timeout, $window, $msg) {
	var swal = $window.swal;
	const time = 400;

    this.confirm = function(title, message, callback) {

        $timeout(function () {
            swal({
                title: title || "Confirmation", text: message, type: "warning", showCancelButton: true, confirmButtonColor: "#DD6B55", confirmButtonText: "Confirm", closeOnCancel: false
            }, function (isConfirm) {
                if(isConfirm) { callback(isConfirm); } else {
                    $timeout(function () { 
                        swal("Cancelled !", $msg.CANCELLED, 'error'); 
                    }, 110);
                }
            }, 'warning');
        }, time);
    };

	this.success = function (title, message) {
        $timeout(function () {
            swal(title, message, 'success');
        }, time);
    };

    this.error = function (title, message) {
        $timeout(function () {
            swal(title || "Oh shit !!" , message, 'error');
        }, time);
    };

    this.warning = function (title, message) {
        $timeout(function () {
            swal(title, message, 'warning');
        }, time);
    };

    this.info = function (title, message) {
        $timeout(function () {
            swal(title, message, 'info');
        }, time);
    }



}]);



"use strict";

app.service('$token', ['$cookieStore', '$localStorage', '$sessionStorage', '$window',
	 function ($cookieStore, $localStorage, $sessionStorage, $window) {
	this.saveInCookie = function(tokenValue) {
    	$cookieStore.put("_token", tokenValue);
	};

	this.deleteFromCookie = function() {
		$cookieStore.remove('_token');
	};

	this.getFromCookie = function() {
		return $cookieStore.get('_token');
	};
	this.saveInLocal = function(tokenValue) {
    	$localStorage._token = tokenValue;
	};

	this.deleteFromLocal = function() {
		$window.localStorage.clear();
		delete $localStorage._token;
	};

	this.getFromLocal = function() {
		return $localStorage._token
	};
	this.saveInSession = function(tokenValue) {
        $sessionStorage._token = tokenValue;
	};

	this.deleteFromSession = function() {
		delete $sessionStorage._token;
	};

	this.getFromSession = function() {
		return $sessionStorage._token;
	};
	this.saveToAllStorage = function(tokenValue) {
    	this.saveInCookie(tokenValue);
    	this.saveInLocal(tokenValue);
    	this.saveInSession(tokenValue);
	};

	this.deleteFromAllStorage = function() {
		
		delete $sessionStorage._token;
		delete $localStorage._token;

		$window.localStorage.clear();
		$cookieStore.remove('_token');
	};


	this.isTokenAvailable = function() {
		if(!this.getFromSession || !this.getFromLocal || !this.getFromCookie) {
			return false;	
		} 
		return true;
	}

}]);

