
"use strict";
/**
 * Storing multiple constant values inside of an object
 * Keep in mind the values in the object mean they can be modified
 * Which makes no sense for a constant, use wisely if you do this
 */

app.controller('productCtrl', ['$rootScope', '$scope', '$api', '$state', '$sweetAlert', '$msg', '$stateParams',
	function productCtrl($rootScope, $scope, $api, $state, $sweetAlert, $msg, $stateParams) {
		$scope.$on('$stateChangeSuccess', dashboardUtilities);

		var STATE_NAME = $state.current.name;

		var pageParams = function(data) {
			return {	
				'module_name': 'products',
				'paging_info': { 'page': parseInt(data.currentPage), 'sort': data.sort || { 'created_at': -1 }, 'limit': parseInt(data.limit)	}
			}
		};

		// pagination initializations
		var pagination = {
			'limit': 54,
			'currentPage': 1,
			'maxSize': 10
		};
		var postData = new Object();

		if(STATE_NAME=='home.products') getProducts(pagination);


		// common functionalities
		function getProducts(pageData) {

			var params = pageParams(pageData);

			if(pageData.search) params.search = pageData.search; 

			// find member list
			$api.products( params ).then( function(res, status) {
				$scope.records	= res.data.data.docs;
				$scope.pagination = {
					'limit': res.data.data.limit,
					'totalItems': res.data.data.total,
					'currentPage': (res.data.data.page > res.data.data.pages) ? res.data.data.pages : res.data.data.page,
					'numPages': res.data.data.pages,
					'maxSize': pageData.maxSize
				};
				if(pageData.search) $scope.pagination.search = pageData.search;
				if(res.data.data.total == 0) $scope.pagination.message = res.data.message;
				
			}, function(res, status) {
				if(res.status == 401) $state.go('login');
				if(res.status == 500) $state.go('500');
			});

		}


		var productDetails = function (product_id) {
			$api.productDetail(product_id).
				success(function (res, status) {
					$scope.product = res.data;
			}).error(function (res, status) {
				if(res.status == 401) $state.go('login');
				if(res.status == 500) $state.go('500');
			})
		};

		if(STATE_NAME=='home.product_detail') productDetails($stateParams.id);

		
		$scope.paginateMembers = function(pageParams) {
			getMembers(pageParams);
		}

		
	}
]);