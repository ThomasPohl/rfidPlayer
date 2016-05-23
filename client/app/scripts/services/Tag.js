'use strict';

angular.module('frontendApp')
  .factory('Tag', ['$resource', function ($resource) {

   return $resource('/api/tags', {}, {
      getAll: {
        method:'GET',
        params: {  },
        isArray:true
      },
      startAssocMode: {
          method:'GET',
          url:'/api/tags/startAssocMode',
          params:{}
      },
      getLastTagId:{
          method:'GET',
          url:'/api/tags/getLastTagId',
          params:{}
      },
      set:{
          method:'POST',
          isArray:true
      },
      delete:{
          method:'DELETE',
          url:'/api/tags/:id',
          params: { id: '@id' },
          isArray: true
      }
   });
  }]);
