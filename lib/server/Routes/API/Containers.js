/**
 * @file Containers
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project Holdfast
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

/**
 * Returns and accepts data for containers running on system.
 * @module Containers
 */

module.exports = function(app, dataSource, router) {
  router.get('/', function(req, res, next) {
    res.json({data: 'Containers'});
  });

  app.use('/api/v1/containers', router)
};