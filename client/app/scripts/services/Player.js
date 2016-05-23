'use strict';

angular.module('frontendApp')
  .factory('Player', ['$resource', function ($resource) {

   return $resource('/api/player', {}, {
      getStatus: {
        method:'GET',
        params: {  }
      },
      play: {
          method:'GET',
          url: '/api/player/play'
      },
      pause: {
          method:'GET',
          url: '/api/player/pause'
      },
      stop: {
          method:'GET',
          url: '/api/player/stop'
      }
   });
  }]);
