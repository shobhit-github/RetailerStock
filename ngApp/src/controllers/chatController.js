
'use strict';
// Storing multiple constant values inside of an object
// Keep in mind the values in the object mean they can be modified
// Which makes no sense for a constant, use wisely if you do this

app.controller('chatCtrl', ['$scope', '$socket',
	function chatCtrl($scope, $socket) {


		/*$socket.on('chat:get-user', function (data) {
			console.log("All Users : ", data)
		});
		
		$socket.on('chat:message-receive', function (data) {
			console.log("Received Message : ", data)
		});*/

		$scope.joinUser = function (user_id) {

			//$socket.emit('chat:join-user', user_id);
		};

		$scope.sendMessage = function (data) {

			//$socket.emit('chat:send-message', data);
		};
		

}]);