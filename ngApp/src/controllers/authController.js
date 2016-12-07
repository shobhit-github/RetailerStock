
'use strict';
// Storing multiple constant values inside of an object
// Keep in mind the values in the object mean they can be modified
// Which makes no sense for a constant, use wisely if you do this

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

	    var error = function(response, status) {
	      $scope.authError = response.data.message;
	      $scope.authSuccess = $scope.authWarning = $scope.authInfo = false;
	    };

		$api.authenticate(users).then( function(response, status) {
	    	$token.saveToAllStorage(response.data.token);
	    	$scope.authSuccess = response.data.message;

	    	$scope.authError = $scope.authWarning = $scope.authInfo = false;	    	
	    	$timeout(function() { $location.path('dashboard'); }, 2000);
	    }, error );
	};


	$scope.resetPassword = function(users) {

	    var error = function(response, status) {
			$scope.authError = response.data.message;
			$scope.authSuccess = $scope.authWarning = $scope.authInfo = false;
	    };

		$api.resetPassword(users).then( function(response, status) {
			$scope.authSuccess= response.data.message;
			$scope.authError  = $scope.authWarning = $scope.authInfo = false;
	    }, error );
	}






}]);