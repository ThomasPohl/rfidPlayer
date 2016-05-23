"use strict";angular.module("frontendApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/tags.html",controller:"TagCtrl"}).when("/music",{templateUrl:"views/music.html",controller:"MusicCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("frontendApp").controller("TagCtrl",["$scope","Tag",function(a,b){a.tags=b.getAll(),a.deleteTag=function(c){b["delete"]({id:c._id},function(){a.tags=b.getAll()})}}]),angular.module("frontendApp").controller("MusicCtrl",["$scope","Music","$log","Tag",function(a,b,c,d){function e(){b.getAll(function(b){for(var c=0;c<b.length;c++){var d=b[c],e=d.artist,f=d.album,g=d.title;void 0==a.music[e]&&(a.music[e]={}),void 0==a.music[e][f]&&(a.music[e][f]={}),a.music[e][f][g]=d}console.debug(a.music)})}this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"],a.music={},a.assocMode=!1,a.assocTimeout=null,a.pollTimeout=null,a.tags=d.getAll(),e(),a.getTitle=function(){if(void 0!==a.selectedTitle&&null!==a.selectedTitle){var b=a.music[a.selectedArtist][a.selectedAlbum][a.selectedTitle];return b}return null},a.arrayBufferToBase64=function(a){for(var b="",c=new Uint8Array(a),d=c.byteLength,e=0;d>e;e++)b+=String.fromCharCode(c[e]);return window.btoa(b)},a.pollTag=function(){a.assocMode&&d.getLastTagId(function(b){d.set({hwId:b.id,artist:a.getTitle().artist,album:a.getTitle().album,title:a.getTitle().title},function(){a.tags=d.getAll()}),a.endAssoc()},function(b){a.pollTimeout=setTimeout(a.pollTag,500)})},a.startAssoc=function(){var b=a.getTitle();null!==b&&d.startAssocMode(function(){c.log("start assoc"),a.assocMode=!0,null!==a.assocTimeout&&clearTimeout(a.assocTimeout),a.assocTimeout=setTimeout(a.endAssoc,1e4),a.pollTag()})},a.endAssoc=function(){c.log("end assoc"),a.assocMode=!1,a.assocTimeout=null},a.hasTag=function(b){if(null==b)return!1;for(var c=0;c<a.tags.length;c++){var d=a.tags[c];if(d.artist==b.artist&&d.album==b.album&&d.title==b.title)return!0}return!1}}]),angular.module("frontendApp").controller("PlayerCtrl",["$scope","$timeout","Player",function(a,b,c){function d(a){var b=Math.round(a/60-.5),c=a-60*b;return 10>c&&(c="0"+c),""+b+":"+c}function e(){return a.secs=Math.round(((new Date).getTime()-a.loaded)/1e3)+a.status.pos,d(a.secs)}a.status={title:"This is the loaded title",pos:12,duration:355,status:"Playing"},a.showPlaylist=!0,a.loaded=(new Date).getTime(),a.play=function(){c.play(function(){g()})},a.pause=function(){c.pause(function(){g()})},a.stop=function(){c.stop(function(){g()})},a.togglePlaylist=function(){a.showPlaylist=!a.showPlaylist},a.currentTime=e(),a.duration=d(a.status.duration),a.progress=0,a.secs=0,a.tickInterval=300,a.reloadInterval=1e4;var f=function(){"Playing"===a.status.status&&(a.currentTime=e(),a.progress=a.secs/a.status.duration*100),b(f,a.tickInterval)},g=function(){c.getStatus(),b(g,a.reloadInterval)};f(),g()}]),angular.module("frontendApp").factory("Tag",["$resource",function(a){return a("/api/tags",{},{getAll:{method:"GET",params:{},isArray:!0},startAssocMode:{method:"GET",url:"/api/tags/startAssocMode",params:{}},getLastTagId:{method:"GET",url:"/api/tags/getLastTagId",params:{}},set:{method:"POST",isArray:!0},"delete":{method:"DELETE",url:"/api/tags/:id",params:{id:"@id"},isArray:!0}})}]),angular.module("frontendApp").factory("Music",["$resource",function(a){return a("/api/music",{},{getAll:{method:"GET",params:{},isArray:!0},update:{method:"POST"}})}]),angular.module("frontendApp").factory("Player",["$resource",function(a){return a("/api/player",{},{getStatus:{method:"GET",params:{}},play:{method:"GET",url:"/api/player/play"},pause:{method:"GET",url:"/api/player/pause"},stop:{method:"GET",url:"/api/player/stop"}})}]),angular.module("frontendApp").directive("bsActiveLink",["$location",function(a){return{restrict:"A",replace:!1,link:function(b,c){b.$on("$routeChangeSuccess",function(){var b=["/#"+a.path(),"#"+a.path(),a.path()];angular.forEach(c.find("a"),function(a){a=angular.element(a),-1!==b.indexOf(a.attr("href"))?a.parent().addClass("active"):a.parent().removeClass("active")})})}}}]);