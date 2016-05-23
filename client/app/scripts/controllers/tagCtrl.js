'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('TagCtrl', function ($scope, Tag) {

    $scope.tags = Tag.getAll();
    $scope.deleteTag = function(tag) {
        Tag.delete({id:tag._id}, function(){
            $scope.tags = Tag.getAll();
        });
        
    };
  });
