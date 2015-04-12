'use strict';

var adoreiApp = angular.module("adoreiApp", [
  "ui.router",
  "ui.bootstrap",
  "ipCookie",
  "angularFileUpload",
  "adoreiServices",
  "adoreiControllers",
  "adoreiDirectives",
  "adoreiRoutes",
  "appConfig"
]);

adoreiApp.run(['$rootScope', 'sessionManager',
  function($rootScope, sessionManager) {
    $rootScope.session = sessionManager;
  }
]);
