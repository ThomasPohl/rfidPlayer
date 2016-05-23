'use strict';

/**
 * @ngdoc overview
 * @name frontendApp
 * @description
 * # frontendApp
 *
 * Main module of the application.
 */
angular
  .module('frontendApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/tags.html',
        controller: 'TagCtrl'
      })
      .when('/music', {
        templateUrl: 'views/music.html',
        controller: 'MusicCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
