import angular from 'angular'
import ngResource from 'angular-resource'
import ngRouter from 'angular-ui-router'
import MovieFactory from './services'

const theApp = angular.module('movieApp', [ngResource, ngRouter])

// theApp.factory('Movie', function ($resource) {
//   return $resource('http://movieapp-sitepointdemos.rhcloud.com/api/movies/:id', { id: '@_id' }, {
//     update: {
//       method: 'PUT'
//     }
//   })
// })

theApp.factory('Movie', MovieFactory)

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
