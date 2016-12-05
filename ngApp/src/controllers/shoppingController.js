
'use strict';
// Storing multiple constant values inside of an object
// Keep in mind the values in the object mean they can be modified
// Which makes no sense for a constant, use wisely if you do this

app.controller('shoppingCtrl', ['$rootScope', '$scope', '$api', '$state',
	function shoppingCtrl($rootScope, $scope, $api, $state) {


		$scope.generateBraintreeToken = function () {

			var error = function (res) {
				console.log(res);
			};

			$api.getBraintreeToken().then( function (res, status) {
				console.log(res);
				braintree.setup(res._token_braintree, 'dropin', {
					container: 'payment-form'
				});
			}, error );

		};

		$scope.generateBraintreeToken();
	}
]);