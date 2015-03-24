'use strict';

var adoreiApp = angular.module("adoreiApp", [
  "ngRoute",
  "adoreiServices",
  "adoreiControllers"
]);

adoreiApp.config(["$routeProvider", function($routeProvider) {
  $routeProvider.
    when('/products', {
      templateUrl: 'partials/product-list.html',
      controller: 'ProductListCtrl'
    }).
    when('/products/new', {
      templateUrl: 'partials/product-new.html',
      controller: 'ProductNewCtrl'
    }).
    when('/categories', {
      templateUrl: 'partials/category-list.html',
      controller: 'CategoryListCtrl'
    }).
    otherwise({
      redirectTo: '/products'
    })
  ;
}]);
