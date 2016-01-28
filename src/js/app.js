import angular from 'angular'
import ngResource from 'angular-resource'
import ngRouter from 'angular-ui-router'
import MovieFactory from './services'

const theApp = angular.module('movieApp', [ngResource, ngRouter])

theApp.config(function ($stateProvider) {
  $stateProvider.state('movies', {
    url: '/movies',
    templateUrl: 'src/partials/movies.html',
    controller: 'MovieListController'
  }).state('viewMovie', {
    url: '/movies/:id/view',
    templateUrl: 'src/partials/movie-view.html',
    controller: 'MovieViewController'
  }).state('newMovie', {
    url: '/movies/new',
    templateUrl: 'src/partials/movie-add.html',
    controller: 'MovieCreateController'
  }).state('editMovie', {
    url: '/movies/:id/edit',
    templateUrl: 'src/partials/movie-edit.html',
    controller: 'MovieEditController'
  })
}).run(function ($state) {
  $state.go('movies')
})

// Factory
theApp.factory('Movie', MovieFactory)

// Controllers
theApp
  .controller('MovieListController', ['$scope', '$state', '$window', 'Movie', function ($scope, $state, $window, Movie) {
    $scope.movies = Movie.query()

    $scope.deleteMovie = function (movie) {
      // if (popupService.showPopup('Really delete this?')) {
        movie.$delete(function () {
          $window.location.href = ''
        })
      // }
    }
  }])
  .controller('MovieViewController', ['$scope', '$stateParams', 'Movie', function ($scope, $stateParams, Movie) {
    $scope.movie = Movie.get({ id: $stateParams.id })
  }])
  .controller('MovieCreateController', ['$scope', '$state', '$stateParams', 'Movie', function ($scope, $state, $stateParams, Movie) {
    $scope.movie = new Movie()

    $scope.addMovie = function () {
      $scope.movie.$save(function () {
        $state.go('movies')
      })
    }
  }])
  .controller('MovieEditController', ['$scope', '$state', '$stateParams', 'Movie', function ($scope, $state, $stateParams, Movie) {
    $scope.updateMovie = function () {
      $scope.movie.$update(function () {
        $state.go('movies')
      })
    }

    $scope.loadMovie = function () {
      $scope.movie = Movie.get({ id: $stateParams.id })
    }

    $scope.loadMovie()
  }])
