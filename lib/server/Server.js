/**
 * @file Server
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project Holdfast
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */


var http = require('http');
var path = require('path')
var express = require('express');
var app = express();
var datasource = require(path.join(__dirname, '../', 'DataProviders'));

var ExpressConfig = require('./ExpressConfig')(app);
var ExpressRoutes = require('./RouteLoader')(app, datasource);
var server = http.createServer(app)

/**
 * Creates the Holdfast Management Server.
 * @module Server
 */

module.exports = server