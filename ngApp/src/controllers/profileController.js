
'use strict';
// Storing multiple constant values inside of an object
// Keep in mind the values in the object mean they can be modified
// Which makes no sense for a constant, use wisely if you do this

app.controller('profileCtrl', ['$rootScope', '$scope', '$api', '$state', '$sweetAlert', '$msg', 
	function profileCtrl($rootScope, $scope, $api, $state, $sweetAlert, $msg) {
		$scope.$on('$stateChangeSuccess', dashboardUtilities);


		// create profile
		$scope.createProfile = function(data) {

			var error = function(res, status) {
				console.log(res);
			}

		};



		// update user profile 
		$scope.updateProfile = function(data) {

			var success = function(res, status) {
				$sweetAlert.success("Success", res.data.message);
			};

			$api.updateUserProfile({
				_id:data._id,
				fisrtname:data.firstname,
				lastname:data.lastname,
				phone:data.phone,
				email:data.email,
				username:data.username
			}).then( success , function(res) { 
				$api.handleError(res);
			});

		};


		// change user password 
		$scope.changePassword = function(data) {

		}

		
	}
]);