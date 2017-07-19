
"use strict";
/**
 * Storing multiple constant values inside of an object
 * Keep in mind the values in the object mean they can be modified
 * Which makes no sense for a constant, use wisely if you do this
 */


app.controller('headerCtrl', ['$scope', '$notify', '$msg', '$pubNub',
	function headerCtrl($scope, $notify, $msg, $pubNub) {

        // Listening to the callbacks
        $pubNub.subscribe('user:registration', function (user) {
            $notify.default(undefined, $msg.USER_X_REGISTERED.sprintf(user.firstname+' '+user.lastname));
        });

        $pubNub.subscribe('user:login_status:true', function (user) {
            $notify.default(undefined, $msg.USER_X_LOGIN.sprintf(user.firstname+' '+user.lastname));
        });

        $pubNub.subscribe('user:login_status:false', function (user) {
            $notify.default(undefined, $msg.USER_X_LOGOUT.sprintf(user.firstname+' '+user.lastname));
        });

	}
]);