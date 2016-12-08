
'use strict';
// Storing multiple constant values inside of an object
// Keep in mind the values in the object mean they can be modified
// Which makes no sense for a constant, use wisely if you do this

app.controller('chatCtrl', ['$rootScope', '$scope', '$api',
	function chatCtrl($rootScope, $scope, $api) {


		var getChatList = function () {
			$api.getChatList({'module_name': 'members'}).then( function(res, status) {
				console.log(res);
				$scope.records	= res.data.data.docs;
			}, function(res, status) {
				console.error(res);
			});
		};

		getChatList();



	}
]);