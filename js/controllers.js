'use strict';

var adoreiControllers = angular.module("adoreiControllers", []);

// Login
adoreiControllers.controller("SigninCtrl", ['$scope', '$window', '$state', 'StockApiClient',
  function($scope, $window, $state, StockApiClient) {
    $scope.loginForm = {};
    $scope.submitLogin = function() {
      StockApiClient.submitLogin($scope.loginForm)
        .then(function(response) {
          $window.location.assign($state.href("admin.products"));
        })
        .catch(function(response) {
          console.log("Wrong credentials");
        })
      ;
    };
  }
]);

// Sidebar
adoreiControllers.controller("SidebarCtrl", ['$scope', '$window', '$state', 'StockApiClient', 'sessionManager',
  function($scope, $window, $state, StockApiClient, sessionManager) {
    $scope.signout = function() {
      StockApiClient.signout().success(function() {
        $window.location.assign($state.href("admin"));
      });
    }
  }
]);

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
adoreiControllers.controller("ProductNewCtrl", ['$scope', '$window', '$state', 'StockApiClient', 'ImageUploader', 'appConfig',
  function($scope, $window, $state, StockApiClient, ImageUploader, appConfig) {
    function getCategories() {
      StockApiClient.getCategories().success(function(categories) {
        $scope.categories = categories;
      });
    }
    $scope.addProduct = function(product) {
      StockApiClient.addProduct(product);
      $window.location.assign($state.href("admin.products"));
    }
    getCategories();
    $scope.product = {};
    $scope.uploader = ImageUploader.getUploader(function(item, response) {
      $scope.product.tmp_image = response.tmp;
    });
  }
]);

// Edit product
adoreiControllers.controller("ProductEditCtrl", ['$scope', '$stateParams', '$window', '$state', 'StockApiClient', 'ImageUploader',
  function($scope, $stateParams, $window, $state, StockApiClient, ImageUploader) {
    function getCategories() {
      StockApiClient.getCategories().success(function(categories) {
        $scope.categories = categories;
      });
    }

    $scope.productLoaded = false;
    $scope.updateProduct = function(product) {
      StockApiClient.updateProduct(product);
      $window.location.assign($state.href('admin.products'));
    }
    getCategories();
    StockApiClient.getProduct($stateParams.id).success(function(product) {
      $scope.product = product;
      $scope.productLoaded = true;
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
        return v.toString(16);
      });
    }

    $scope.guid = guid();

  }
]);

// Category list
adoreiControllers.controller("CategoryListCtrl", ['$scope', '$modal', 'StockApiClient',
  function($scope, $modal, StockApiClient) {
    function getCategories() {
      StockApiClient.getCategories().success(function(categories) {
        $scope.categories = categories;
      });
    }
    $scope.removeCategory = function(category) {
      var modalInstance = $modal.open({
        templateUrl: 'partials/shared/modal_confirm.html',
        controller: 'ModalConfirmCtrl'
      });
      modalInstance.result.then(function() {
        StockApiClient.removeCategory(category).then(function(response) {
          getCategories();
          modalInstance.close();
        });
      }, function() {
        modalInstance.close();
      });
    }
    getCategories();
  }
]);

// New category
adoreiControllers.controller("CategoryNewCtrl", ['$scope', '$window', '$state', 'StockApiClient',
  function($scope, $window, $state, StockApiClient) {
    $scope.addCategory = function(category) {
      StockApiClient.addCategory(category);
      $window.location.assign($state.href("admin.categories"));
    }
    $scope.category = {};
  }
]);

// Edit category
adoreiControllers.controller("CategoryEditCtrl", ['$scope', '$stateParams', '$window', '$state', 'StockApiClient',
  function($scope, $stateParams, $window, $state, StockApiClient) {
    $scope.updateCategory = function(category) {
      StockApiClient.updateCategory(category).success(function() {
        $window.location.assign($state.href("admin.categories"));
      });
    }
    StockApiClient.getCategory($stateParams.id).success(function(category) {
      $scope.category = category;
    });
  }
]);
