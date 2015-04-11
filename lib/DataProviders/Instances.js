/**
 * @file Instances
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project Holdfast-Manager
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

var Promise = require('bluebird')
var EventEmitter = require('events').EventEmitter
var _ = require('lodash');

/**
 * Gets holdfast instance data.
 * @module Instances
 */

var Instances = (function(){
  function Instances(options){
    this.Redis = options.Redis
    this.Sub = options.Sub
    this.Sub.on('message', function(p, c, m){
      console.log(p)
      console.log(c);
      console.log(m);
    })
  }
  Instances.prototype = _.create(EventEmitter.prototype, {
    getHosts: function() {
      var foundHosts = []
      /**
       * TODO - Remove the call to keysAsync here. Substitute scan?
       * @author - Jim Bulkowski
       * @date - 4/10/15
       * @time - 3:39 PM
       */

      return this.Redis.Client.keysAsync('holdfast-instance:*').then(function(hosts) {
        _.each(hosts, function(host){
          foundHosts.push(this.Redis.Client.hgetallAsync(host).then(function(h) {
            var instanceObject ={
              containers: {}
            };
            var containers = _.omit(h, 'instanceId')
            instanceObject.instanceId = h.instanceId

            var unGrouped =_.map(containers, function(container) {
              var c = JSON.parse(container)
              if(!_.has(instanceObject.containers, c.ManagerData.DockerImage)){
                instanceObject.containers[c.ManagerData.DockerImage] = []
              }
              return c
            })
            _.each(unGrouped, function(c){
              instanceObject.containers[c.ManagerData.DockerImage].push(c)
            });
            return instanceObject
          }))
        }.bind(this))
        /**
         * Return the composite array of current instance data.
         */
        return Promise.all(foundHosts)
      }.bind(this))
    }
  });
  return Instances
})()

module.exports = function(client, subscription){
  return new Instances({Redis: client, Sub: subscription});
}