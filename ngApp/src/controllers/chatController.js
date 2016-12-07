
'use strict';
// Storing multiple constant values inside of an object
// Keep in mind the values in the object mean they can be modified
// Which makes no sense for a constant, use wisely if you do this

app.controller('chatCtrl', ['$rootScope', '$scope', '$api', '$state', '$sweetAlert',
	function chatCtrl($rootScope, $scope, $api, $state, $sweetAlert) {


		$scope.getChatMember = function () {
			console.log($scope);
		};

		$scope.getChatMember();
	}
]);