'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('PlayerCtrl', function ($scope, $timeout, Player) {

    function secToStr(secs){
        var minutes = Math.round(secs/60-0.5);
        var rest = secs - 60* minutes;
        if (rest<10){
            rest='0'+rest;
        }
        return ''+minutes+':'+rest;
    }
    function getTime(){
        $scope.secs = Math.round((new Date().getTime() - $scope.loaded)/1000) + $scope.status.pos;
        return secToStr($scope.secs);
    }
    $scope.status = { title:'This is the loaded title', pos:12, duration:355, status:'Playing'};
    $scope.showPlaylist = true;
    
    $scope.loaded = new Date().getTime();
    $scope.play=function(){
        Player.play(function(){reload();});
    };
    $scope.pause=function(){
        Player.pause(function(){reload();});
    };
    $scope.stop=function(){
        Player.stop(function(){reload();});
    };
    $scope.togglePlaylist=function(){
        $scope.showPlaylist=!$scope.showPlaylist;
    };
    $scope.currentTime = getTime();
    $scope.duration=secToStr($scope.status.duration);
    $scope.progress=0;
    $scope.secs=0;
    $scope.tickInterval = 300; //ms
    $scope.reloadInterval = 10000;
    var tick = function() {
        if ($scope.status.status==='Playing'){
            $scope.currentTime = getTime();
            $scope.progress=$scope.secs/$scope.status.duration*100;
        }
        $timeout(tick, $scope.tickInterval); // reset the timer
    };
    var reload = function(){
        Player.getStatus();
        $timeout(reload,  $scope.reloadInterval);    
    };

    // Start the timer
    tick();
    reload();
  });
