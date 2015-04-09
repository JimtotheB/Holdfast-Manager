/**
 * @file Hosts
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project Holdfast
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */
var Events = require('events').EventEmitter
var _ = require('lodash');

/**
 * Manages Host data
 * @module Hosts
 */

var Hosts = (function(){
  function Hosts(){
    Events.call(this);
    this.connectedHosts = [];
    this.name = "hosts"
  }

  Hosts.prototype = _.create(Events.prototype, {
    constructor: Hosts
  });

  Hosts.prototype.stripClient = function() {
    var currentHosts = _.map(this.connectedHosts, function(client){
      return _.omit(client, 'client');
    }.bind(this));
    this.emit('updated', currentHosts)
    return currentHosts
  };

  /**
   * addHost - Add host to array of currently connected hosts.
   *
   * @param {object} host
   * @returns {Array}
   */
  Hosts.prototype.addHost = function(host) {
    host.Images = {}
    this.connectedHosts.push(host)
    return this.stripClient()
  };

  /**
   * updateHost - Adds or updates hosts.
   * @param hostData
   */
  Hosts.prototype.updateHost = function(hostData) {
    var existingContainer =_.find(this.connectedHosts, 'id', hostData.id)
    if(existingContainer){
      //console.log(existingContainer);
    } else {
      //console.log('Create container');
    }
  };
  
  /**
   * removeHost - Removes host from array of currently connected hosts.
   *
   * @param {object} host
   * @returns {Array}
   */
  Hosts.prototype.removeHost = function(host) {
    var remove = _.findIndex(this.connectedHosts, 'id', host.id)
    this.connectedHosts.splice(remove, 1);
    return this.stripClient()
  };

  /**
   * getHosts - Gets currently connected hosts.
   *
   * @returns {Array}
   */
  Hosts.prototype.getHosts = function(){
    return this.stripClient()
  };

  /**
   * 
   * @param host
   * @returns {*}
   */
  Hosts.prototype.addContainers = function(host) {
    var Host = _.find(this.connectedHosts, 'HostId', host.HostId);
    var containerData = {state: host.state, container: host.container}
    if(Host.Images[host.image] && Host.Images[host.image].length){
      Host.Images[host.image].push(containerData);
    }
    else {
      Host.Images[host.image] = []
      Host.Images[host.image].push(containerData)
    }
    console.log(Host)
    return this.stripClient();
  };
  Hosts.prototype.updateContainer = function(container){
    var Host = _.find(this.connectedHosts, 'HostId', container.HostId);
    var containers = Host.Images[container.image]

    var key = _.findKey(containers, {container: {ManagerId: container.container.ManagerId}});

    Host.Images[container.image][key] = container;
    //update = container
    return this.stripClient()
  };

  /**
   * Make this a singleton.
   */
  return new Hosts()


})();

module.exports = Hosts;