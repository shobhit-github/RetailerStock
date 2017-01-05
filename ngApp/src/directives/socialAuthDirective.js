
'use strict';
// Storing multiple constant values inside of an object
// Keep in mind the values in the object mean they can be modified
// Which makes no sense for a constant, use wisely if you do this



app.directive('socialAuth', 
  function () {

    var controller = function($scope, $rootScope, $auth, $location, $timeout, $token) {

        $scope.socialAuth = function(provider) {

            $scope.authSuccess = $scope.authError = $scope.authWarning = $scope.authInfo = false;

            $auth.authenticate(provider).then(function(response, status) {
                $token.saveToAllStorage(response.data.token);
                $scope.authSuccess = response.data.message;

                $timeout(function() { $location.path('dashboard'); }, 2000);
            });
        };
    };

    var linking = function ($scope, $element, $attr) {

    };

    var template = function($elements, $attrs) {

      if($attrs.hasOwnProperty('facebook')) var btns = `<button type="button" ng-click="socialAuth('facebook');" class="btn btn-round btn-facebook"><i class="fa fa-facebook"></i></button>`;
      if($attrs.hasOwnProperty('twitter')) btns += `<button type="button" ng-click="socialAuth('twitter');" class="btn btn-round btn-twitter"><i class="fa fa-twitter"></i></button>`;
      if($attrs.hasOwnProperty('google')) btns += `<button type="button" ng-click="socialAuth('google');" class="btn btn-round btn-google"><i class="fa fa-google"></i></button>`;
      if($attrs.hasOwnProperty('linkedin')) btns += `<button type="button" ng-click="socialAuth('linkedin');" class="btn btn-round btn-linkedin"><i class="fa fa-linkedin"></i></button>`;

      return `<div class="social-login-sec">`+btns+`</div>`;
    };

    return {
      restrict: 'E',
      link: linking,
      controller: controller,
      template: template
    };

});
