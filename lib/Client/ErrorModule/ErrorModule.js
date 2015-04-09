/**
 * @file ErrorModule
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project Holdfast
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

require('./controllers');
require('./directives');

angular.module('Holdfast.Errors', [
  'Holdfast.Errors.controllers',
  'Holdfast.Errors.directives'
])
.config(function($stateProvider) {
  $stateProvider
    .state('error', {
      abstract: true,
      url: 'error/',
      template: '<ui-view/>'
    })
    .state('error.404', {
      url: '404',
      templateUrl: 'errormodule/404'
    })
    .state('error.500', {
      url: '500',
      templateUrl: 'errormodule/500'
    })
});