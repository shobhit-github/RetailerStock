
"use strict";
/**
 * Storing multiple constant values inside of an object
 * Keep in mind the values in the object mean they can be modified
 * Which makes no sense for a constant, use wisely if you do this
 */

app.controller('dashboardCtrl', ['$rootScope', '$scope', '$api', 'Pubnub',
	function dashboardCtrl($rootScope, $scope, $api, Pubnub) {
	    $scope.$on('$stateChangeSuccess', dashboardUtilities);

        $scope.channel = 'Channel-vg2otkim4';

	    $scope.getUsersCounts = function () {

            $api.usersCount().then(
                function (response) {

                    $scope.usersCount = response.data.data;
                },
                function (response) {
                    $api.handleError(response)
                }
            );
        };


        $scope.getUsersCounts();

        // Listening to the callbacks
        $scope.$on(Pubnub.getMessageEventNameFor($scope.channel), function (ngEvent, m) {


            switch (m.event){

                case 'user:registration':
                case 'user:login_status:true':
                case 'user:login_status:false':
                    $scope.getUsersCounts();
                    break;

            }
        });


	}
]);