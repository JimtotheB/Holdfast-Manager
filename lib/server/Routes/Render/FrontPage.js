/**
 * @file FrontPage
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project Holdfast
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

/**
 * Renders The Holdfast front page.
 * @module FrontPage
 */

module.exports = function(app, dataSource, router) {
  router.get('/', function(req, res, next) {
    res.render('FrontPage', {baseURL: req.protocol+'://'+req.get("host")+'/'});
  });

  app.use('/', router)
};