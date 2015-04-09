/**
 * @file Images
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project Holdfast
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

/**
 * Returns and accepts data for Docker images.
 * @module Images
 */

module.exports = function(app, dataSource, router) {
  router.get('/', function(req, res, next) {
    res.json({data: 'Images'});
  });

  app.use('/api/v1/images', router)
};