'use strict';

var adoreiControllers = angular.module("adoreiControllers", []);

  // Product list
adoreiControllers.controller("ProductListCtrl", ['$scope', 'StockApiClient',
  function($scope, StockApiClient) {
    function getProducts() {
      StockApiClient.getProducts().success(function(products) {
        $scope.products = products;
      });
    };
    getProducts();
  }
]);

// New product
adoreiControllers.controller("ProductNewCtrl", ['$scope', '$location', 'StockApiClient',
  function($scope, $location, StockApiClient) {
    function getCategories() {
      StockApiClient.getCategories().success(function(categories) {
        $scope.categories = categories;
      });
    }
    $scope.addProduct = function(product) {
      StockApiClient.addProduct(product);
      $location.path('#/products');
    }
    getCategories();
    $scope.product = {};
  }
]);

// Category list
adoreiControllers.controller("CategoryListCtrl", ['$scope', 'StockApiClient',
  function($scope, StockApiClient) {
    function getCategories() {
      StockApiClient.getCategories().success(function(categories) {
        $scope.categories = categories;
      });
    }
    getCategories();
  }
]);
