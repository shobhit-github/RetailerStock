
'use strict';
// Storing multiple constant values inside of an object
// Keep in mind the values in the object mean they can be modified
// Which makes no sense for a constant, use wisely if you do this



app.directive('socialAuth', 
  function () {

    var controller = function($scope) {
      $scope.openWindow = function(uri) {
        return window.open(uri,"",'height=500, width=850, top='+(screen.height/4)+', left='+(screen.width/4));
      }
    }

    var linking = function ($scope, $element, $attr) {

    }

    var template = function($elements, $attrs) {

      if($attrs.facebook) var btns = `<button type="button" ng-click="openWindow(facebook);" class="btn btn-round btn-facebook"><i class="fa fa-facebook"></i></button>`;
      if($attrs.twitter) btns += `<button type="button" ng-click="openWindow(twitter);" class="btn btn-round btn-twitter"><i class="fa fa-twitter"></i></button>`;
      if($attrs.google) btns += `<button type="button" ng-click="openWindow(google);" class="btn btn-round btn-google"><i class="fa fa-google"></i></button>`;
      if($attrs.linkedin) btns += `<button type="button" ng-click="openWindow(linkedin);" class="btn btn-round btn-linkedin"><i class="fa fa-linkedin"></i></button>`;

      return `<div class="social-login-sec">`+btns+`</div>`;
    }

    return {
      restrict: 'E',
      scope: {  facebook:'@', twitter:'@', google:'@', linkedin:'@'  },
      link: linking,
      controller: controller,
      template: template
    };

});
