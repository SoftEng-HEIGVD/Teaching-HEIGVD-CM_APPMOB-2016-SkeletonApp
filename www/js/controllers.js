angular.module('citizen-engagement.controllers', [])

  .controller('NewIssueCtrl', function(CameraService, $scope) {
    $scope.takePicture = function() {
      CameraService.getPicture({
        quality: 75,
        targetWidth: 400,
        targetHeight: 300,
        destinationType: Camera.DestinationType.DATA_URL
      }).then(function(imageData) {
        $scope.imageData = imageData;
      });
    };
  })

  .controller('IssueMapCtrl', function(mapboxMapId, mapboxAccessToken, $scope) {

    var mapboxTileLayer = "http://api.tiles.mapbox.com/v4/" + mapboxMapId;
    mapboxTileLayer = mapboxTileLayer + "/{z}/{x}/{y}.png?access_token=" + mapboxAccessToken;

    $scope.mapDefaults = {
      tileLayer: mapboxTileLayer
    };

    $scope.mapCenter = {
      lat: 51.48,
      lng: 0,
      zoom: 14
    };

    $scope.mapMarkers = [];

    $scope.mapMarkers.push({
      lat: 51.48,
      lng: 0,
      message: "<p>Hello {{ name }}!</p>",
      getMessageScope: function() {
        var scope = $scope.$new();
        scope.name = 'World';
        return scope;
      }
    });
  })

  .factory("CameraService", function($q) {
    return {
      getPicture: function(options) {
        var deferred = $q.defer();

        navigator.camera.getPicture(function(result) {
          // do any magic you need
          deferred.resolve(result);
        }, function(err) {
          deferred.reject(err);
        }, options);

        return deferred.promise;
      }
    }
  })

;
