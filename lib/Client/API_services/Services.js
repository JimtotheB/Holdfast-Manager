/**
 * @file Services
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project Holdfast
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */
require('./EventStream/EventStream');
require('./Containers/Containers');
require('./Hosts/Hosts');
require('./Images/Images');

var dependencies = [
  'Holdfast.API.Events',
  'Holdfast.API.Containers',
  'Holdfast.API.Hosts',
  'Holdfast.API.Images'
]

module.exports = angular.module('Holdfast.API', dependencies);