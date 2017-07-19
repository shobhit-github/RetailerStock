
"use strict";
/**
 * Storing multiple constant values inside of an object
 * Keep in mind the values in the object mean they can be modified
 * Which makes no sense for a constant, use wisely if you do this
 */


app.service('$pubNub', ['$rootScope', '$scope', 'Pubnub',
	 function ($rootScope, $scope, Pubnub) {


	this.publish = function(channel, data, callback) {

        Pubnub.publish({ channel: channel, message: data }, function(info){
            callback(info);
        });
	};

	this.subscribe = function(channel, callback) {

		$scope.$on(Pubnub.getMessageEventNameFor(channel), function (ngEvent, data) {
            callback(data);
		});

	};

}]);

