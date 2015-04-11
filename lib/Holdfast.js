/**
 * @file Holdfast
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project Holdfast
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */


//var Manager = require('./Application/Redis/Events');
//var Manager = new Manager();
//var ClientStore = require('./Application/ClientStore');
var _ = require('lodash');
var redisFactory = require('./Application/Redis/ConnectionFactory')("redis://database.internal:6379/0");
var dataSource = require('./DataProviders')(redisFactory(), redisFactory('__keyevent@*__:*'));
var server = require('./Server/Server')(dataSource);



//Manager.on('host-start', function(clientData) {
//  var client = new ClientStore(clientData, Manager.remoteManager);
//  client.publish('connected', 'Connection to manager successful');
//  dataSource.hosts.addHost(client);
//});
//
//Manager.on('host-stop', function(clientData){
//  dataSource.hosts.removeHost(clientData);
//});
//
//Manager.on('host-update', function(hostData){
//  dataSource.hosts.updateHost(hostData)
//});
//
//Manager.on('host-manager-register', function(newContainer){
//  dataSource.hosts.addContainers(newContainer);
//});
//
//Manager.on('client-container-start', function(clientData){
//  dataSource.hosts.addContainers(clientData);
//});
//
//Manager.on('client-container-transition', function(container){
//  dataSource.hosts.updateContainer(container);
//});
//
//
//server.listen(8080, function(){
//  console.log("Server started on port 8080");
//  Manager.broadcastStartup(function(err, count) {
//    console.log(err, count)
//  });
//});

server.listen(8080, function(){
  console.log("Server started on port 8080");
});

var shutDownHandler = function() {
  //Manager.broadcastShutdown(function(err, count) {
  //  console.log(err, count);
  //  process.exit(0)
  //});
  process.exit(0)
};


process.on('exit', function(code){
  console.log('Shutting down Holdfast-client', code);
});
//process.on('uncaughtExeption', exitHandler.bind(null, {exit: true}));
process.on('SIGINT',  shutDownHandler);
process.on('SIGTERM',  shutDownHandler);