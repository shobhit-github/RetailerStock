
'use strict';
// Storing multiple constant values inside of an object
// Keep in mind the values in the object mean they can be modified
// Which makes no sense for a constant, use wisely if you do this

app.controller('shoppingCtrl', ['$rootScope', '$scope', '$api', '$state',
	function shoppingCtrl($rootScope, $scope, $api, $state) {

		$scope.generateBraintreeToken = function () {

			$api.getBraintreeToken().then( function (res, status) {
				$scope._token_braintree = res.data._token_braintree;
			}, function () { console.error(res) });

		};


		$scope.makePayment = function (product) {

			var error = function (res, status) {
				$api.handleError(res);
			};

			var success = function (res, status) {
				console.error(res);
			};

			braintree.setup($scope._token_braintree, 'dropin', {
				container: 'payment-form',
				onPaymentMethodReceived: function (obj) {

					$api.makePayment({
						card_info: obj,
						product_info: product
					}).then(success, error);
				}
			});
		};


		$scope.generateBraintreeToken();
	}
]);