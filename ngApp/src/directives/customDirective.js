
'use strict';
// Storing multiple constant values inside of an object
// Keep in mind the values in the object mean they can be modified
// Which makes no sense for a constant, use wisely if you do this


app.directive('loader', 
  function() {

    return {
      restrict:'E',
      template: function($element, $attrs) {
        return `
          <div class="spinner">
            <div class="rect1"></div>
            <div class="rect2"></div>
            <div class="rect3"></div>
            <div class="rect4"></div>
            <div class="rect5"></div>
          </div>
        `
      }
    }



})

app.directive('selectLimit', 
  function () {

    return {
      restrict: 'E',
      scope: {
        elemData  : '=',
        elemSend : '&'
      },
      link : function($scope, $element, $attrs) {
          // code will here as per future requirements....
      },
      template: `
          <div class="col-sm-6"> 
            <div class="dataTables_length" id="datatable-keytable_length">
              <label class="table-label"> Show 
                <select 
                  ng-model="elemData.limit"
                  class="form-control select-limit input-sm"
                  ng-change="elemSend(elemData);"
                  ng-init="list = [10, 25, 50, 100, 500]"
                  ng-options="x for x in list" >
                </select>
                <span style="margin-left:0px;">entries</span>
              </label>
            </div>
          </div>
      `
    };

});

app.directive('searchField', 
  function () {

    return {
      restrict: 'E',
      scope: {
        elemData  : '=',
        elemSend : '&'
      },
      link : function($scope, $element, $attrs) {
          // code will here as per future requirements....
      },
      template: `      
        <div class="col-sm-4 pull-right">
          <div id="datatable-keytable_filter" class="dataTables_filter">
            <label class="table-label">Search: 
                <input ng-enter="elemSend(elemData)" ng-model="elemData.search.keyword" type="search" class="form-control search-field input-sm" placeholder="enter keywords..." />
            </label>
          </div>
        </div>
      `
    };

});

app.directive('checkBox', 
  function () {

    return {
      restrict: 'E',
      scope: {
        allRecords: '=',
        data: '='
      },
      link: function($scope, $element, $attrs) {
        // code will here as per future requirements....
      },
      controller: function($scope, $rootScope) {

        $scope.selectAll = function() {
          $rootScope.checkedArray = new Array(); 
          angular.forEach($scope.allRecords, function(value, index) {
            if($scope.allRecords.isCheckAll) {
              $rootScope.checkedArray.push(value._id); value.selected = true;
            } else { value.selected = false; }
          })
        }
        $scope.selectOne = function() { 
          $rootScope.checkedArray = new Array(); 
          angular.forEach($scope.allRecords, function(value, index) {
            if($scope.allRecords[index].selected) { $rootScope.checkedArray.push(value._id); }
          })
          if($rootScope.checkedArray.length == 0) $scope.allRecords.isCheckAll = false ;
        }
      },
      template: function($elements, $attrs) {

        return  $attrs.$attr.checkAll
          ? `<input type="checkbox" ng-model="allRecords.isCheckAll" ng-change="selectAll();" class="flat">`
          : `<input type="checkbox" ng-checked="allRecords.isCheckAll" ng-model="data.selected" ng-change="selectOne();" value="{{data._id}}" class="flat" /> `;
      }
    };

});

app.directive('currentPageInfo', 
  function () {

    return {
      restrict: 'E',
      scope: {
        elemData  : '='
      },
      link : function($scope, $element, $attrs) {
          // code will here as per future requirements....
      },
      template: `      
        <div class="col-sm-4">
          <div style="padding-top:5px;" class="dataTables_info" id="datatable_info" role="status" aria-live="polite">Showing {{ elemData.limit * (elemData.currentPage - 1 ) + 1 }} to {{ elemData.limit * (elemData.currentPage - 1 ) + elemData.limit }} of {{ elemData.totalItems }} entries</div>
        </div>
      `
    };

});

app.directive('goToPage', ['$api', '$msg',
  function ($api, $msg) {

    return {
      restrict: 'E',
      scope: {
        elemData  : '=',
        elemSend  : '&'
      },
      link : function($scope, $element, $attrs) {
        // DOM manipulation will be here.. 
        var numField = angular.element($element[0].querySelector('input'));
        
        numField.on('keyup', function(e) {
          if(0 == this.value || "" == this.value) { this.value = $scope.elemData.currentPage = 1; }
          if(this.value > $scope.elemData.numPages) { this.value = $scope.elemData.currentPage = $scope.elemData.numPages; }
        })
      },
      template: `      
        <div class="col-sm-2">
          <div class="go-to-div">
            <label class="table-label"> Go to 
              <input ng-enter="elemSend(elemData);" ng-model="elemData.currentPage" type="number" min="1" max="{{ elemData.numPages }}" class="form-control input-sm go-to"> <span> page</span> </label> 
          </div>
        </div>
      `
    };

}]);


app.directive('pagination', 
  function () {

    return {
      restrict: 'E',
      scope: {
        elemData  : '=',
        elemSend  : '&'
      },
      link : function($scope, $element, $attrs) {
          // code will here as per future requirements....
      },
      template: `      
        <div class="col-sm-6">
          <div class="dataTables_paginate paging_simple_numbers" id="datatable_paginate">
            <ul uib-pagination 
                template-url="views/elements/pagination.html"
                total-items="elemData.totalItems"
                ng-model="elemData.currentPage"
                max-size="elemData.maxSize"
                style="margin:0;" class="pagination"
                rotate="false"
                num-pages="elemData.numPages"
                items-per-page="elemData.limit"
                ng-change="elemSend(elemData)" >
            </ul>
          </div>
        </div>
      `
    };

});               