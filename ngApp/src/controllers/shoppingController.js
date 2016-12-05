
'use strict';
// Storing multiple constant values inside of an object
// Keep in mind the values in the object mean they can be modified
// Which makes no sense for a constant, use wisely if you do this

app.controller('shoppingCtrl', ['$rootScope', '$scope', '$api', '$state', '$sweetAlert',
	function shoppingCtrl($rootScope, $scope, $api, $state, $sweetAlert) {

		$scope.generateBraintreeToken = function () {

			$api.getBraintreeToken().then( function (res, status) {
				$scope._token_braintree = res.data._token_braintree;
			}, function () { console.error(res) });

		};


		$scope.makePayment = function (product) {

			$scope.paymentPopup = true;

			var error = function (res, status) {
				$sweetAlert.error(undefined, res.data.message);
			};

			var success = function (res, status) {
				$sweetAlert.success("Success", res.data.message);
			};

			braintree.setup($scope._token_braintree, 'dropin', {
				container: 'payment-form',
				paypal: {
					singleUse: true,
					amount: 10.00,
					currency: 'USD'
				},
				onPaymentMethodReceived: function (obj) {

					$scope.paymentPopup = false;

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