
"use strict";
/**
 * Storing multiple constant values inside of an object
 * Keep in mind the values in the object mean they can be modified
 * Which makes no sense for a constant, use wisely if you do this
 */


app.controller('footerCtrl', ['$scope', 'Pubnub', '$rootScope',
	function footerCtrl($scope, Pubnub, $rootScope) {

        // Subscribing to the ‘messages-channel’ and trigering the message callback
        Pubnub.subscribe({
            channel: ['user:registration','user:login_status:true','user:login_status:false'],
            withPresence:true,
            triggerEvents: ['callback']
        });

	}
]);