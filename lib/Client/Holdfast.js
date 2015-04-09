/**
 * @file Holdfast
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project Holdfast
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

require('./_compiled/templates');
require('./API_services/Services')
require('./Standalone/Directives');
require('./Frontpage/Frontpage');
require('./ErrorModule/ErrorModule');

var dependencies = [
  'Holdfast.templates',
  'Holdfast.API',
  'ui.router',
  'Holdfast.Frontpage',
  'Holdfast.Directives',
  'Holdfast.Errors'
]

angular.module('Holdfast', dependencies).config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $stateProvider
    .state('main',{
      abstract: true,
      url: '/',
      template: "<main-menu></main-menu><ui-view/>"
    })

  $locationProvider.html5Mode(true)
  $urlRouterProvider.otherwise(function($injector, $location){
    $injector.invoke(function($state) {
      $state.go('error.404')
    })
  })
});
