
"use strict";
/**
 * Storing multiple constant values inside of an object
 * Keep in mind the values in the object mean they can be modified
 * Which makes no sense for a constant, use wisely if you do this
 */

app.controller('membersCtrl', ['$rootScope', '$scope', '$api', '$state', '$sweetAlert', '$msg',
	function membersCtrl($rootScope, $scope, $api, $state, $sweetAlert, $msg) {
		$scope.$on('$stateChangeSuccess', dashboardUtilities);

		var pageParams = function(data) {
			return {	
				'module_name': 'members',
				'paging_info': { 'page': parseInt(data.currentPage), 'sort': data.sort || { 'created_at': -1 }, 'limit': parseInt(data.limit)	}
			}
		};

		// pagination initializations
		var pagination = {
			'limit': 500,
			'currentPage': 1,
			'maxSize': 10
		};
		var postData = new Object();

		// initial functionalities
		getMembers(pagination);


		// common functionalities
		function getMembers(pageData) {

			var params = pageParams(pageData);

			if(pageData.search) params.search = pageData.search; 

			// find member list
			$api.findMember( params ).then( function(res, status) {
				$scope.records	= res.data.data.docs;
				$scope.pagination = {
					'limit': res.data.data.limit,	
					'totalItems': res.data.data.total,
					'currentPage': (res.data.data.page > res.data.data.pages) ? res.data.data.pages : res.data.data.page,
					'numPages': res.data.data.pages,
					'maxSize': pageData.maxSize
				};
				if(pageData.search) $scope.pagination.search = pageData.search ; 
				if(res.data.data.total == 0) $scope.pagination.message = res.data.message;
				
			}, function(res, status) {
				if(res.status == 401) $state.go('login');
				if(res.status == 500) $state.go('500');
				
			});

		}


		$scope.deleteMember = function(data) {
			$sweetAlert.confirm("Confirmation", $msg.CONFIRM_DELETE, function(res) {
				if(res) {
					$api.removeMember(data).then( function(res, status) {
						if(res.data.success==true) getMembers($scope.pagination);
					}, $api.handleError );
				}
			});
		};


		$scope.paginateMembers = function(pageParams) {
			getMembers(pageParams);
		}

		
	}
]);