var api_url = "http://localhost:3000";

angular.module('starter.services', [])

.factory('GasStations', function($resource) {
    return $resource(api_url + '/gas_stations/:id', {id: '@id'});
})

.factory('SearchService', function () {
  var data = {};

  return {
    getData: function () {
      //You could also return specific attribute of the form data instead
      //of the entire data
      return data;
    },
    setData: function (newData) {
      //You could also set specific attribute of the form data instead
      data = newData
    },
    resetData: function () {
      //To be called when the data stored needs to be discarded
      data = {};
    }
  };
});