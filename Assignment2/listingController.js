angular.module('listings').controller('ListingsController', ['$scope', 'Listings', 
  function($scope, Listings) {
    $scope.listings = Listings;
    $scope.detailedInfo = undefined;
    $scope.mapLink = undefined;
    // $scope.searchTable   = '';
    /* 
      Implement these functions in the controller to make your application function 
      as described in the assignment spec. 
     */
    $scope.addListing = function(code,name,latitude,longitude,address) {
      var newListing = {
        "code": code.toUpperCase(), 
        "name": name, 
        "coordinates": {
            "latitude": latitude, 
            "longitude": longitude
        }, 
        "address": address
      }
      if(newListing.name == undefined)
        newListing.name = "Unavailable"
      if(newListing.coordinates.latitude == undefined)
        newListing.coordinates.latitude = "Unavailable"
      if(newListing.coordinates.longitude == undefined)
        newListing.coordinates.longitude = "Unavailable"
      if(newListing.address == undefined)
        newListing.address = "Unavailable"

      $scope.listings.push(newListing);
    };
    $scope.deleteListing = function(index) {
      $scope.listings.splice($scope.listings.indexOf(index),1)
    };
    $scope.showDetails = function(index) {
      $scope.detailedInfo = index;
      if(index.coordinates == undefined){
        index.coordinates = {
            "latitude": "Unavailable", 
            "longitude": "Unavailable"
        }
      }
      if(index.address != undefined){
              link = "https://www.google.com/maps/place/";
        for(i=0;i<link.length;i++){
          if(index.address.charAt(i) == ' ')
            link+='+';
          else
            link+=index.address.charAt(i);
      }
      $scope.mapLink = link;
      }else
        index.address = "Unavailable";
    }
  }
]);