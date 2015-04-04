'use strict';

var adoreiAuth = angular.module("adoreiAuth", []);

adoreiAuth.config(["$authProvider",
  function($authProvider) {
    $authProvider.configure({
      apiUrl: 'http://localhost:54321'
    });
  }
]);
