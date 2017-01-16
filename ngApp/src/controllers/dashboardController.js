
"use strict";
/**
 * Storing multiple constant values inside of an object
 * Keep in mind the values in the object mean they can be modified
 * Which makes no sense for a constant, use wisely if you do this
 */

app.controller('dashboardCtrl', ['$rootScope', '$scope', '$api', '$state',
	function dashboardCtrl($rootScope, $scope, $api, $state) {
	    $scope.$on('$stateChangeSuccess', dashboardUtilities);


	}
]);