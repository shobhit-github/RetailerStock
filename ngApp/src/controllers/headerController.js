
"use strict";
/**
 * Storing multiple constant values inside of an object
 * Keep in mind the values in the object mean they can be modified
 * Which makes no sense for a constant, use wisely if you do this
 */


app.controller('headerCtrl', ['$scope', '$socket', '$notify',
	function headerCtrl($scope, $socket, $notify) {

        $socket.on("customer-added", function (data) {
            console.log(data);
            $notify.default(undefined, data.message);
        });
	}
]);