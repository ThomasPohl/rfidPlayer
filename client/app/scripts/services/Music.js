'use strict';

angular.module('frontendApp')
  .factory('Music', ['$resource', function ($resource) {

   return $resource('/api/music', {}, {
      getAll: {
        method:'GET',
        params: {  },
        isArray:true
      },
      update: {
          method:'POST'
      }
   });
  }]);
