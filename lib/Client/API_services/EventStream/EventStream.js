/**
 * @file EventStream
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project Holdfast
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

module.exports = angular.module('Holdfast.API.Events',[], function($provide) {
  return $provide.factory('EventStream', function($rootScope) {
    var source = new EventSource('events/v1')

    source.addEventListener('open', function(evt) {
      console.log("Opened Event stream.")
    }, false);

    source.addEventListener('error', function(evt) {
      console.log('There was an error in the event-stream.');
      console.log(evt)
    }, false);

    source.addEventListener('update', function(evt) {
      $rootScope.$broadcast('data-update', JSON.parse(evt.data))
    }, false);

    return source
  })
});