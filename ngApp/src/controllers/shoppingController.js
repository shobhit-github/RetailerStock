
'use strict';
// Storing multiple constant values inside of an object
// Keep in mind the values in the object mean they can be modified
// Which makes no sense for a constant, use wisely if you do this

app.controller('shoppingCtrl', ['$rootScope', '$scope', '$api', '$state',
	function shoppingCtrl($rootScope, $scope, $api, $state) {

		var product = new Object();

		$scope.generateBraintreeToken = function () {
			$scope.product._id = 54;
			$api.getBraintreeToken().then( function (res, status) {
				$scope._token_braintree = res.data._token_braintree;
			}, function () { console.error(res) });

		};


		$scope.checkoutProceed = function () {
			braintree.setup($scope._token_braintree, 'dropin', {
				container: 'payment-form'
			});
		};

		$scope.makePayment = function (product_data) {
			console.log(product_data);
		};

		$scope.generateBraintreeToken();
	}
]);