
'use strict';
// Storing multiple constant values inside of an object
// Keep in mind the values in the object mean they can be modified
// Which makes no sense for a constant, use wisely if you do this

app.config(function($httpProvider) {

	$httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.headers.delete = { "Content-Type": "application/json;charset=utf-8" };

});

app.factory('$httpPreConfig', ['$http', '$rootScope', function($http, $rootScope) {
    $http.defaults.transformRequest.push(function () {
        $rootScope.$broadcast('httpCallStarted');
    });
    $http.defaults.transformResponse.push(function(){
        $rootScope.$broadcast('httpCallCompleted');
    });
    return $http;
}]);
