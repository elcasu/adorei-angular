'use strict';

var adoreiServices = angular.module("adoreiServices", []);

// Session managment service
// TODO: Put all these functions in some Session or Auth service
adoreiServices.factory("sessionManager", ['ipCookie',
  function(ipCookie) {
    return {
      userIsAuthenticated: function() {
        var requiredHeaders = [
          'access-token',
          'token-type',
          'uid',
          'client'
        ];
        var valid = true;
        for(var h in requiredHeaders) {
          if(!ipCookie(requiredHeaders[h])) {
            valid = false;
          }
        }
        if(!valid) {
          ipCookie.remove('access-token');
          ipCookie.remove('token-type');
          ipCookie.remove('client');
          ipCookie.remove('uid');
        }
        return valid;
      }
    };
  }
]);

adoreiServices.provider('session',
  function sessionProvider() {
    this.$get = ["sessionManager", function(sessionManager) {
      return sessionManager;
    }]
  }
);

// Http interceptor for handling responses
adoreiServices.factory("apiHttpInterceptor", ["$window", "$location", "ipCookie", "appConfig",
  function($window, $location, ipCookie, appConfig) {
    var authHeaders = ['access-token', 'client', 'uid', 'expiry', 'token-type'];
    function getRemoteDomain(remoteUrl) {
        return remoteUrl.replace(/^(https?:\/\/[^\/]+\/).*$/, "$1");
    }
    return {
      request: function(req) {
        var remoteUrl = getRemoteDomain(req.url);
        if(remoteUrl == appConfig.apiUrl) {
          for(var a in authHeaders) {
            var hdr = authHeaders[a];
            if(ipCookie(hdr)) {
              req.headers[hdr] = ipCookie(hdr);
            }
          }
        }
        return req;
      },
      response: function(resp) {
        if(resp.status == 401) {
          // If access denied, redirect to login page
          $window.location.assign($state.href("admin"));
          return resp;
        }
        var remoteUrl = getRemoteDomain(resp.config.url);
        if(remoteUrl == appConfig.apiUrl) {
          for(var a in authHeaders) {
            var hdr = authHeaders[a];
            ipCookie(hdr, resp.headers(hdr));
          }
        }
        return resp;
      }
    };
  }
]);

adoreiServices.config(["$httpProvider",
  function($httpProvider) {
    $httpProvider.interceptors.push('apiHttpInterceptor');
  }
]);

// REST API client
adoreiServices.factory("StockApiClient", ["appConfig", "$http", "ipCookie",
  function(appConfig, $http, ipCookie) {
    var apiUrl = appConfig.apiUrl;

    return {
      submitLogin: function(form) {
        return $http.post(apiUrl + "auth/sign_in", {
          "email": form.email,
          "password": form.password
        });
      },
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
      },
      signout: function() {
        return $http.delete(apiUrl + 'auth/sign_out');
      }
    }
  }
]);

// Image uploader service
adoreiServices.factory("ImageUploader", ["FileUploader", "appConfig", "ipCookie",
  function(FileUploader, appConfig, ipCookie) {
    return {
      getUploader: function(callback) {
        return new FileUploader({
          url: appConfig.apiUrl + 'upload',
          headers: {
            'access-token': ipCookie('access-token'),
            'token-type': ipCookie('token-type'),
            'client': ipCookie('client'),
            'uid': ipCookie('uid')
          },
          onSuccessItem: callback,
          autoUpload: true
        });
      }
    };
  }
]);
