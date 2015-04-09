/**
 * @file index
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project Holdfast
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

/**
 * Bundles Dataproviders into one object.
 * @module index
 */

var Hosts = require('./Hosts');

module.exports = {
  hosts: Hosts
}