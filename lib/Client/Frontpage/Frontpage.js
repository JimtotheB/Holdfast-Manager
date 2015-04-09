/**
 * @file Frontpage
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project Holdfast
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

angular.module('Holdfast.Frontpage', [])
  .config(function($stateProvider) {
    $stateProvider
      .state('main.frontPage',{
        url: '',
        templateUrl: "frontpage/frontpage",
        controller: function($scope, HostApi, EventStream) {
          $scope.showContainers = false;
          $scope.connectedHosts = 0
          $scope.$on('data-update', function(evt, data){
            $scope.$apply(function(){
              $scope.connectedHosts = data
            });
          });
          HostApi.getAll().then(function(data) {
            $scope.connectedHosts = data
          })
        }
      })
  });