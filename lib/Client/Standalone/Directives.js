/**
 * @file index
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project Holdfast
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

require('./MainMenu/MainMenu')

directives = [
  'Holdfast.Directives.MainMenu'
];

angular.module('Holdfast.Directives', directives);