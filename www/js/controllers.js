angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope, $state) {

    $scope.goToState = function (state_name) {
      $state.go(state_name);
    }
  })

  .controller('GasStationsCtrl', function ($scope, $stateParams, GasStations, SearchService, $rootScope) {

    $scope.page_size = 25;
    if ($rootScope.newSearch == true) {
      $scope.current_page = 1;
      $scope.moreDataCanBeLoaded = true;
      $scope.gas_stations = [];

      $rootScope.current_page = $scope.current_page;
      $rootScope.moreDataCanBeLoaded = $scope.moreDataCanBeLoaded;
    }
    else {
      $rootScope.newSearch = false;
      $scope.current_page = $rootScope.current_page;
      $scope.moreDataCanBeLoaded = $rootScope.moreDataCanBeLoaded;

      $scope.gas_stations = SearchService.getData();
    }

    $scope.loadMoreData = function () {
      GasStations.query({
        address: $stateParams.address,
        sort: $stateParams.sort,
        order: $stateParams.order,
        fuel_type: $stateParams.fuel_type,
        with_price: $stateParams.with_price,
        radius: $stateParams.radius,
        page: $scope.current_page
      }, function (response) {

        $scope.gas_stations = $scope.gas_stations.concat(response);
        SearchService.setData($scope.gas_stations);

        if (response.length < $scope.page_size) {
          $scope.moreDataCanBeLoaded = false;
        }
        $scope.$broadcast('scroll.infiniteScrollComplete');
        $scope.current_page = $scope.current_page + 1;

        $rootScope.current_page = $scope.current_page;
        $rootScope.moreDataCanBeLoaded = $scope.moreDataCanBeLoaded;
      });
    };

  })

  .controller('GasStationDetailCtrl', function ($scope, $stateParams, GasStations) {
    $scope.gas_station = GasStations.get({ id: $stateParams.gas_station_id });
  })

  .controller('AddPriceCtrl', function ($scope, $stateParams, GasStations, FuelPrices, $ionicHistory, $state) {
    $scope.gas_station = GasStations.get({ id: $stateParams.gas_station_id });
    $scope.fuel_price = new FuelPrices();
    $scope.data = {fuel_type: 'euro_95'};

    $scope.state = $state;

    $scope.addFuelPrice = function() { //create a new movie. Issues a POST to /api/movies
      $scope.fuel_price.$save({gas_station_id: $scope.gas_station.id, fuel_type: $scope.data.fuel_type},function() {
        $scope.message = { success: 'Successfully submit new fuel price' };
        $ionicHistory.currentView($ionicHistory.backView());
        $state.go('app.gas_stations-detail', { gas_station_id: $stateParams.gas_station_id }, {reload: false});
      }, function() {
        $scope.message = { error: 'Error when adding price.' };
      });
    };
  })

  .controller('StationSearchCtrl', function ($scope, $stateParams, $state, $rootScope) {
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

      console.log('current search: ' + JSON.stringify(search));
      console.log('rootscope search: ' + JSON.stringify($rootScope.search));
      console.log(JSON.stringify(search) == $rootScope.search);
      if (JSON.stringify(search) == $rootScope.search) {
        $rootScope.newSearch = false;
      }
      else {
        $rootScope.newSearch = true;
        $rootScope.search = JSON.stringify(search);
      }
      $state.go('app.gas_stations', { address: formatted_address, fuel_type: search.fuel_type, sort: search.sort,
        order: search.order, with_price: search.with_price, radius: search.radius });
    };
  });
