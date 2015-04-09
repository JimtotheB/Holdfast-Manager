/**
 * @file Hosts
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project Holdfast
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

module.exports = angular.module('Holdfast.API.Hosts',[], function($provide) {
  return $provide.factory('HostApi', function($q, $http) {

    return {
      getAll: function() {
        var deferred = $q.defer()
        $http.get('/api/v1/hosts')
          .success(function(data, status) {
            console.log(data)
            deferred.resolve(data.data)
          })
          .error(function(data, status) {
            deferred.reject('Error');
          })
        return deferred.promise
      }
    }
  })
});