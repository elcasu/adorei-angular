'use strict';

var adoreiServices = angular.module("adoreiServices", []);

adoreiServices.factory("StockApiClient", ["$http", function($http) {
  var apiUrl = "http://localhost:54321/";
  return {
    getProducts: function() {
      return $http.get(apiUrl + "products");
    },
    addProduct: function(product) {
      $http.post(apiUrl + "products", {
        "product": {
          code: product.code,
          name: product.name,
          category_id: product.category.id,
          cost_price: product.cost_price,
          price: product.price,
          stock: product.stock
        }
      });
    },
    getCategories: function() {
      return $http.get(apiUrl + 'categories');
    }
  }
}]);
