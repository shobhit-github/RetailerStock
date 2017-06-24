
"use strict";
/**
 * Storing multiple constant values inside of an object
 * Keep in mind the values in the object mean they can be modified
 * Which makes no sense for a constant, use wisely if you do this
 */


app.controller('headerCtrl', ['$scope', 'Pubnub', '$notify',
	function headerCtrl($scope, Pubnub, $notify) {

        $scope.channel = 'Channel-vg2otkim4';

        // Listening to the callbacks
        $scope.$on(Pubnub.getMessageEventNameFor($scope.channel), function (ngEvent, m) {


            switch (m.event){

                case 'user:registration':
                    $notify.default(undefined, m.content.firstname+" "+m.content.lastname+" as a new user registered !");
                    break;

                case 'user:login_status:true':
                    $notify.default(undefined, m.content.firstname+" "+m.content.lastname+" has been logged in !");
                    break;

                case 'user:login_status:false':
                    $notify.default(undefined, m.content.firstname+" "+m.content.lastname+" has been logout !");
                    break;
            }



        });


	}
]);