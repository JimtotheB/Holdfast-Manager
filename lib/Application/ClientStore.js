/**
 * @file ClientStore
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project Holdfast
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

var dockerCfg = [
  {
    Image: 'paperelectron/paperelectron-web',
    HostConfig: {
      PortBindings: {"8080/tcp": [{HostIp: '',HostPort: '8081'}]}
    }
  },
  {
    Image: 'paperelectron/paperelectron-web',
    HostConfig: {
      PortBindings: {"8080/tcp": [{HostIp: '',HostPort: '8082'}]}
    }
  },
  {
    Image: 'paperelectron/paperelectron-web',
    HostConfig: {
      PortBindings: {"8080/tcp": [{HostIp: '',HostPort: '8083'}]}
    }
  },
  {
    Image: 'paperelectron/littoral-docker',
    HostConfig: {
      PortBindings: {"8080/tcp": [{HostIp: '',HostPort: '8080'}]}
    }
  }
];

/**
 * Holds Client Host Data.
 * @module ClientStore
 */

module.exports = (function(){
  function ClientStore(info, redis){
    this.client = redis
    this.HostId = info.HostId
    this.channelBase = 'holdfast-commands-' + this.HostId + '-';
  }

  ClientStore.prototype.publish = function(command, message){
    this.client.publish(this.channelBase + command, {message: 'startup', docker: dockerCfg})
  };
  return ClientStore
})()