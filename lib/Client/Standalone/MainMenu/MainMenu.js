/**
 * @file MainMenu
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project Holdfast
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

angular.module('Holdfast.Directives.MainMenu', [])
  .directive('mainMenu', function(){
    return {
      restrict: 'E',
      templateUrl: 'mainmenu/menu',
      controller: function($state) {
        $state.name = 'Main Menu'
      }
    }
});