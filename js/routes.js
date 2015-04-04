'use strict';

var adoreiRoutes = angular.module("adoreiRoutes", []);

adoreiRoutes.config(["$stateProvider", "$urlRouterProvider",
  function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('signin', {
        url: '/',
        templateUrl: 'partials/signin.html',
        controller: 'SigninCtrl'
      })
      .state('admin', {
        url: '/app',
        abstract: true,
        template: '<ui-view/>',
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      })
      .state('admin.products', {
        url: '/products',
        templateUrl: 'partials/products/list.html',
        controller: 'ProductListCtrl'
      })
    ;
  }
]);


/*
adoreiRoutes.config(["$routeProvider", function($routeProvider) {
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
*/
