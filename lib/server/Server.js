/**
 * @file Server
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project Holdfast
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

var http = require('http');
var express = require('express');
var app = express();

/**
 * Creates the Holdfast Management Server.
 * @module Server
 */

module.exports = function(datasource){
  var ExpressConfig = require('./ExpressConfig')(app);
  var ExpressRoutes = require('./RouteLoader')(app, datasource);

  return http.createServer(app)
}