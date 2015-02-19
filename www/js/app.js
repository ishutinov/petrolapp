// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngResource'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.gas_stations', {
    url: '/gas_stations',
    cache: false,
    params: { address: null, fuel_type: 'euro_95', sort: 'distance', order: 'asc', with_price: false, radius: 10, doNewSearch: true },
    views: {
      'menuContent': {
        templateUrl: 'templates/gas_stations.html',
        controller: 'GasStationsCtrl'
      }
    }
  })
  .state('app.gas_stations-detail', {
    url: '/gas_stations/:gas_station_id',
    cache: false,
    views: {
      'menuContent': {
        templateUrl: 'templates/gas_station-detail.html',
        controller: 'GasStationDetailCtrl'
      }
    }
  })

  .state('app.add_price', {
    url: "/gas_stations/:gas_station_id/add_price",
    cache: false,
    views: {
      'menuContent': {
        templateUrl: "templates/add_price.html",
        controller: 'AddPriceCtrl'
      }
    }
  })

  .state('app.search', {
    url: "/search",
    views: {
      'menuContent': {
        templateUrl: "templates/search.html",
        controller: 'StationSearchCtrl'
      }
    }
  })


  .state('app.about', {
    url: "/about",
    views: {
      'menuContent': {
        templateUrl: "templates/about.html"
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/search');
});
