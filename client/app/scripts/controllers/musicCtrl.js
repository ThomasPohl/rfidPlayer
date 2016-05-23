'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('MusicCtrl', function ($scope, Music, $log, Tag) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.music={};
    $scope.assocMode=false;
    $scope.assocTimeout=null;
    $scope.pollTimeout=null;
    $scope.tags = Tag.getAll();
    function loadMusic(){
        Music.getAll(function(allMusic){
        for (var i=0;i<allMusic.length;i++){
            var music = allMusic[i];
            var artist = music.artist;
            var album = music.album;
            var title = music.title;
            if ($scope.music[artist] == undefined){
                $scope.music[artist] = {};
            } 
            if ($scope.music[artist][album] == undefined){
                $scope.music[artist][album] = {};
            } 
            $scope.music[artist][album][title] = music;
        }
        console.debug($scope.music); 
        });
    }
    loadMusic();

    $scope.getTitle = function (){
        if ($scope.selectedTitle!==undefined && $scope.selectedTitle!==null ){
        var result =  $scope.music[$scope.selectedArtist][$scope.selectedAlbum][$scope.selectedTitle];
            return result;
        } else {
            return null;
        }
    };

    $scope.arrayBufferToBase64 = function( buffer ) {
        var binary = '';
        var bytes = new Uint8Array( buffer );
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode( bytes[ i ] );
        }
        return window.btoa( binary );
    };
    
    $scope.pollTag = function(){
        if ($scope.assocMode){
            Tag.getLastTagId(function(lastTagId){
                    Tag.set({
                        hwId:lastTagId.id, 
                        artist:$scope.getTitle().artist,
                        album:$scope.getTitle().album,
                        title:$scope.getTitle().title
                    }, function(){
                        $scope.tags = Tag.getAll();    
                    });
                    
                    $scope.endAssoc();
                
            },function(err){
                $scope.pollTimeout=setTimeout($scope.pollTag,500);
            });
        }
    };
    
    $scope.startAssoc =function(){
        var title = $scope.getTitle();
        if (title!==null){
            Tag.startAssocMode(function(){
                $log.log('start assoc');
                $scope.assocMode=true;
                if ($scope.assocTimeout!==null){
                    clearTimeout($scope.assocTimeout);
                }            
                $scope.assocTimeout = setTimeout($scope.endAssoc,10000);
                $scope.pollTag();
            });
        }
    };
    
    $scope.endAssoc = function(){
        $log.log('end assoc');
        $scope.assocMode=false;
        $scope.assocTimeout=null;
    };
    
    $scope.hasTag = function(song){
        if (song==null) {
            return false;
        }
        for (var i=0;i<$scope.tags.length;i++){
            var tag = $scope.tags[i];
            if (tag.artist==song.artist && tag.album==song.album && tag.title==song.title){
                return true;
            }
        }
        return false;
    };
});
