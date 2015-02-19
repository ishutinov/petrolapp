var api_url = "http://localhost:3000";

angular.module('starter.services', [])

.factory('GasStations', function($resource) {
    return $resource(api_url + '/gas_stations/:id', {id: '@id'});
});