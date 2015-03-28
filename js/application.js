'use strict';

var adoreiApp = angular.module("adoreiApp", [
  "ngRoute",
  "ui.bootstrap",
  "angularFileUpload",
  "adoreiServices",
  "adoreiControllers",
  "adoreiDirectives"
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
    when('/products/edit/:id', {
      templateUrl: 'partials/products/edit.html',
      controller: 'ProductEditCtrl'
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
