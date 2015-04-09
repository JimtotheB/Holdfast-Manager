/**
 * @file ExpressConfig
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project Holdfast
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

var path = require('path');
var static = require('express').static;

var responseTime = require('response-time');
var compress = require('compression');
var morgan = require('morgan');
var favicon = require('serve-favicon');

var basePublicPath = path.join(__dirname,'Public');
var faviconPath = path.join(__dirname,'Public', 'favicon.ico');
var baseViewPath = path.join(__dirname,'Views');
var renderEngine = 'jade';


/**
 * Configures the Express Server
 * @module ExpressConfig
 */

module.exports = function expressConfig(app){
  app.use(favicon(faviconPath))
  app.locals.pretty = true;
  app.use(responseTime());
  app.use(compress());
  app.use(morgan('common'));
  app.use(static(basePublicPath));
  app.set('views', baseViewPath);
  app.set('view engine', renderEngine);
};
