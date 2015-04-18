'use strict';

angular.module("adoreiApp", [
  "ui.router",
  "ui.bootstrap",
  "ipCookie",
  "angularFileUpload",
  "controllers",
  "services",
  "directives",
  "routes",
  "appConfig",
  "flash"
])

  .run(['$rootScope', 'sessionManager',
    function($rootScope, sessionManager) {
      $rootScope.session = sessionManager;
    }
  ])
;
