// 
// Here is how to define your module 
// has dependent on mobile-angular-ui
// 
var app = angular.module('MobileAngularUiExamples', [
  'ngRoute',
  'mobile-angular-ui',
	'custom-scroll'
]);

//
// For this trivial demo we have just a unique MainController 
// for everything
//
app.controller('MainController', function($rootScope, $scope, $q, $timeout){

  // User agent displayed in home page
  $scope.userAgent = navigator.userAgent;
  //
  // 'Scroll' screen
  // 
  var scrollItems = [];
	var MAX_ITEM = 200;

	for (var i = 1; i <= 50; i++) {
    scrollItems.push('Item ' + i);
  }

  $scope.scrollItems = scrollItems;
	$scope.hasMoreData = true;

	//should return promise both resolve and reject
	$scope.refresh = function () {
		var defer = $q.defer();

		$timeout(function () {
			for (var i= 1; i<=5; i++) {
				if ($scope.scrollItems.length > MAX_ITEM) {
					defer.reject('no more data');
				} else {
					$scope.scrollItems.unshift(Math.random());
				}
			}
			defer.resolve();
		}, 2000);

		return defer.promise;
	};

	//should return promise both resolve and reject
	$scope.loadMore = function () {
		var defer = $q.defer();

		$timeout(function () {
			for (var i= 1; i<=20; i++) {
				if ($scope.scrollItems.length > MAX_ITEM) {
					defer.reject('no more data');
					$scope.hasMoreData = false;
				} else {
					$scope.scrollItems.push(Math.random());
				}
			}
			defer.resolve();
		}, 1500);

		return defer.promise;
	};

});