'use strict';

var adoreiServices = angular.module("adoreiServices", []);

// REST API client
adoreiServices.factory("StockApiClient", ["$http", "appConfig",
  function($http, appConfig) {
    var apiUrl = appConfig.apiUrl;
    return {
      getProducts: function() {
        return $http.get(apiUrl + "products");
      },
      getProduct: function(id) {
        return $http.get(apiUrl + "products/" + id);
      },
      removeProduct: function(product) {
        return $http.delete(apiUrl + 'products/' + product.id);
      },
      addProduct: function(product) {
        $http.post(apiUrl + "products", {
          product: {
            code: product.code,
            name: product.name,
            category_id: product.category.id,
            cost_price: product.cost_price,
            price: product.price,
            stock: product.stock
          },
          tmp_image: product.tmp_image
        });
      },
      updateProduct: function(product) {
        $http.put(apiUrl + "products/" + product.id, {
          "product": {
            code: product.code,
            name: product.name,
            category_id: product.category.id,
            cost_price: product.cost_price,
            price: product.price,
            stock: product.stock
          },
          tmp_image: product.tmp_image
        });
      },
      getCategories: function() {
        return $http.get(apiUrl + 'categories');
      },
      addCategory: function(category) {
        $http.post(apiUrl + "categories", {
          category: {
            name: category.name,
            description: category.description
          }
        });
      },
      updateCategory: function(category) {
        return $http.put(apiUrl + "categories/" + category.id, {
          category: {
            name: category.name,
            description: category.description
          }
        });
      },
      getCategory: function(id) {
        return $http.get(apiUrl + "categories/" + id);
      },
      removeCategory: function(category) {
        return $http.delete(apiUrl + 'categories/' + category.id);
      }
    }
  }
]);

// Image uploader service
adoreiServices.factory("ImageUploader", ["FileUploader", "appConfig",
  function(FileUploader, appConfig) {
    return {
      getUploader: function(callback) {
        return new FileUploader({
          url: appConfig.apiUrl + 'upload',
          onSuccessItem: callback,
          autoUpload: true
        });
      }
    };
  }
]);
