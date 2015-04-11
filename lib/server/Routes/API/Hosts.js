/**
 * @file Hosts
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project Holdfast
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

/**
 * Returns and accepts data for hosts connected to Holdfast
 * @module Hosts
 */

module.exports = function(app, dataSource, router) {
  router.get('/', function(req, res, next) {
    dataSource.instances.getHosts().then(function(data) {
      res.json({data: data});
    });

  });

  app.use('/api/v1/hosts', router)
};