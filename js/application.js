'use strict';

var adoreiApp = angular.module("adoreiApp", [
  "ngRoute",
  "adoreiServices",
  "adoreiControllers"
]);

adoreiApp.config(["$routeProvider", function($routeProvider) {
  $routeProvider.
    when('/products', {
      templateUrl: 'partials/products/list.html',
      controller: 'ProductListCtrl'
    }).
    when('/products/new', {
      templateUrl: 'partials/products/new.html',
      controller: 'ProductNewCtrl'
    }).
    when('/categories', {
      templateUrl: 'partials/categories/list.html',
      controller: 'CategoryListCtrl'
    }).
    otherwise({
      redirectTo: '/products'
    })
  ;
}]);
