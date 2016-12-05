
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


		$scope.makePayment =function () {
			console.log($scope);
			/*braintree.setup(res.data._token_braintree, 'dropin', {
				container: 'payment-form'
			});*/
		};

		$scope.generateBraintreeToken();
	}
]);