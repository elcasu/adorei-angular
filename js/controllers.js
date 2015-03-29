'use strict';

var adoreiControllers = angular.module("adoreiControllers", []);

  // Product list
adoreiControllers.controller("ProductListCtrl", ['$scope', '$modal', 'StockApiClient',
  function($scope, $modal, StockApiClient) {
    function getProducts() {
      StockApiClient.getProducts().success(function(products) {
        $scope.products = products;
      });
    };

    $scope.removeProduct = function(product) {
      var modalInstance = $modal.open({
        templateUrl: 'partials/shared/modal_confirm.html',
        controller: 'ModalConfirmCtrl'
      });
      modalInstance.result.then(function() {
        StockApiClient.removeProduct(product).then(function(response) {
          getProducts();
          modalInstance.close();
        });
      }, function() {
        modalInstance.close();
      });
    }
    getProducts();
  }
]);

// Controller for modals
adoreiControllers.controller("ModalConfirmCtrl", ['$scope', '$modalInstance',
  function($scope, $modalInstance) {
    $scope.title = "Eliminar producto";
    $scope.message = "Seguro que desea eliminar el producto?";
    $scope.ok = function() {
      $modalInstance.close();
    };
    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };
  }
]);

// New product
adoreiControllers.controller("ProductNewCtrl", ['$scope', '$location', 'StockApiClient', 'ImageUploader', 'appConfig',
  function($scope, $location, StockApiClient, ImageUploader, appConfig) {
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
    $scope.uploader = ImageUploader.getUploader(function(item, response) {
      $scope.product.tmp_image = response.tmp;
    });
  }
]);

// Edit product
adoreiControllers.controller("ProductEditCtrl", ['$scope', '$routeParams', '$location', 'StockApiClient', 'ImageUploader',
  function($scope, $routeParams, $location, StockApiClient, ImageUploader) {
    function getCategories() {
      StockApiClient.getCategories().success(function(categories) {
        $scope.categories = categories;
      });
    }

    $scope.updateProduct = function(product) {
      StockApiClient.updateProduct(product);
      $location.path('#/products');
    }
    getCategories();
    StockApiClient.getProduct($routeParams.id).success(function(product) {
      $scope.product = product;
      angular.forEach($scope.categories, function(category) {
        if(category.id == product.category_id) {
          $scope.product.category = category;
        }
      });
    });
    $scope.uploader = ImageUploader.getUploader(function(item, response) {
      $scope.product.tmp_image = response.tmp;
    });

    function guid() {
      return 'xxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
        console.log("a");
        return v.toString(16);
      });
    }

    $scope.guid = guid();

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
