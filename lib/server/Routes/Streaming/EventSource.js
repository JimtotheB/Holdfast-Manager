/**
 * @file EventSource
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project Holdfast
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

var _ = require('lodash')

/**
 * Streams events to client.
 * @module EventSource
 */

var routes = {};
module.exports = function(app, dataSource, router) {
    router.get('/', function(req, res, next) {

      req.socket.setTimeout(60 * 60 * 1000);
      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
      });
      res.write('\n')

      var sendUpdate = function(data){
        res.write('event: update\n')
        res.write('data:' + JSON.stringify(data) + '\n\n');
        res.flush()
      };
      dataSource.instances.addListener('updated', sendUpdate);

     req.on('close', function() {
       console.log('closing stream')
       dataSource.instances.removeListener('updated', sendUpdate)
     })
    });

    app.use('/events/v1', router)
};
