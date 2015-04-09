/**
 * @file index
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project Holdfast
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

var _ = require('lodash');
var path = require('path');
var fs = require('fs');
var router = require('express').Router
/**
 * Loads all of the Express configured routes
 * @module index
 */

module.exports = function(app, dataSource){
  var RoutePath = path.join(__dirname, "Routes");
  var directories = fs.readdirSync(RoutePath);
  if(directories.length){
    _.each(directories, function(directory) {
      var routePath = path.join(RoutePath, directory)
      if(fs.statSync(routePath).isDirectory() && directory.indexOf('.') === -1){
        var routeFiles = fs.readdirSync(routePath)
        _.each(routeFiles, function(file) {
          var routeFilePath = path.join(routePath, file)
          if(!fs.statSync(routeFilePath).isDirectory() && file.indexOf('.') > 0){
            require(routeFilePath)(app, dataSource, router());
          }

        })
      }
    })
  }
  app.all('*?', function(req, res, next){
    console.log('fallthrough')
    res.render('FrontPage', {baseURL: req.protocol+'://'+req.get("host")+'/'});
  })
};