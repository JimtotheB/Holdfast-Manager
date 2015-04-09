/**
 * @file Events
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project Holdfast
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

var EventEmitter= require('events').EventEmitter
var _ = require('lodash');
var util = require('util');

var RedisFactory = require('./ConnectionFactory')("redis://database.internal:6379/0");

var Events = (function() {
  function Events(){
    var self = this;

    this.routeEvent = function(pattern, channel, message) {
      var parsedMessage
      try {
        parsedMessage = JSON.parse(message);
      } catch (e) {
        console.log('Message not valid JSON', message)
        console.dir(message)
        return
      }
      switch (channel) {
        case 'holdfast-manager-startup':
          self.emit('host-start', parsedMessage)
          break;
        case 'holdfast-manager-shutdown':
          self.emit('host-stop', parsedMessage)
          break;
        case 'holdfast-manager-register-container':
          self.emit('host-manager-register', parsedMessage)
          break;
        case 'holdfast-manager-update':
          self.emit('host-update', parsedMessage)
          break;
        case 'holdfast-manager-container-start':
          self.emit('client-container-start', parsedMessage)
          break;
        case 'holdfast-manager-state-transition':
          self.emit('client-container-transition', parsedMessage)
          break;

        default:
          console.log('no handler');

      }
    };

    this.remoteManager = RedisFactory();
    this.subscription = RedisFactory('holdfast-manager*');

    this.subscription.on('subscribe',function(channel, count) {
      console.log('Subscribed to', channel);
      self.subscription.on('message', self.routeEvent)
    })

  }
  Events.prototype = _.create(EventEmitter.prototype, {
    constructor: Events,
    test: function(){
      this.emit('client-start', 'Derpppp')
    },
    broadcastStartup: function(cb) {
      this.remoteManager.publish('holdfast-global-manager-started', {startup: Date.now()}, cb)
    },
    broadcastShutdown: function(cb) {
      this.remoteManager.publish('holdfast-global-manager-stopped', {shutdown: Date.now()}, cb)
    }
  });
  return Events
})();

/**
 * Proxies redis events.
 * @module Events
 */

module.exports = Events