'use strict';

var adoreiApp = angular.module("adoreiApp", [
  "ngRoute",
  "ui.bootstrap",
  "angularFileUpload",
  "adoreiServices",
  "adoreiControllers",
  "adoreiDirectives",
  "appConfig"
]);

adoreiApp.config(["$routeProvider", function($routeProvider) {
  $routeProvider.
    // ------------- Products -------------
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
    // ------------- Categories -------------
    when('/categories', {
      templateUrl: 'partials/categories/list.html',
      controller: 'CategoryListCtrl'
    }).
    when('/categories/new', {
      templateUrl: 'partials/categories/new.html',
      controller: 'CategoryNewCtrl'
    }).
    when('/categories/edit/:id', {
      templateUrl: 'partials/categories/edit.html',
      controller: 'CategoryEditCtrl'
    }).
    otherwise({
      redirectTo: '/products'
    })
  ;
}]);
