
"use strict";
/**
 * Storing multiple constant values inside of an object
 * Keep in mind the values in the object mean they can be modified
 * Which makes no sense for a constant, use wisely if you do this
 */


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