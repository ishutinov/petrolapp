angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

  })

  .controller('GasStationsCtrl', function ($scope, $stateParams, GasStations, $timeout) {
    $scope.gas_stations = GasStations.query({
      address: $stateParams.address,
      sort: $stateParams.sort,
      order: $stateParams.order,
      fuel_type: $stateParams.fuel_type,
      with_price: $stateParams.with_price,
      radius: $stateParams.radius,
      page: 1
    });

    $scope.page = 1;

  })

  .controller('GasStationDetailCtrl', function ($scope, $stateParams, GasStations) {
    $scope.gas_station = GasStations.get({ id: $stateParams.gas_station_id });
  })

  .controller('StationSearchCtrl', function ($scope, $state) {
    $scope.search = {
      city: 'Uithuizen',
      state: 'Groningen',
      country: 'Netherlands',
      fuel_type: 'euro_95',
      sort: 'distance',
      order: 'asc',
      with_price: false,
      radius: 10
    };

    // Called when the form is submitted
    $scope.doSearch = function (search) {
      var formatted_address = [search.street_address, search.postal_code, search.city, search.state, search.country]
        .filter(function (n) {
          return n != undefined
        }).join(', ');
      console.log(formatted_address);
      $state.go('app.gas_stations', { address: formatted_address, fuel_type: search.fuel_type, sort: search.sort,
        order: search.order, with_price: search.with_price, radius: search.radius });
    };
  });
