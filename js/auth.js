'use strict';

var adoreiAuth = angular.module("adoreiAuth", []);

adoreiAuth.config(["$authProvider", "$httpProvider",
  function($authProvider, $httpProvider) {
    $authProvider.configure({
      apiUrl: 'http://localhost:54321',
    });
  }
]);

