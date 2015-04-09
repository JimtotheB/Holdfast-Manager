/**
 * @file Containers
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project Holdfast
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */


module.exports = angular.module('Holdfast.API.Containers',[], function($provide) {
  return $provide.factory('ContainerApi', function($q, $http) {

    return {
      getAll: function() {
        var deferred = $q.defer()
        $http.get('/api/v1/containers')
          .success(function(data, status) {
            deferred.resolve(data)
          })
          .error(function(data, status) {
            deferred.reject('Error');
          })
        return deferred.promise
      }
    }
  })
});
