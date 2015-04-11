(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @file Holdfast
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project Holdfast
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

require('./_compiled/templates');
require('./API_services/Services')
require('./Standalone/Directives');
require('./Frontpage/Frontpage');
require('./ErrorModule/ErrorModule');

var dependencies = [
  'Holdfast.templates',
  'Holdfast.API',
  'ui.router',
  'Holdfast.Frontpage',
  'Holdfast.Directives',
  'Holdfast.Errors'
]

angular.module('Holdfast', dependencies).config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $stateProvider
    .state('main',{
      abstract: true,
      url: '/',
      template: "<main-menu></main-menu><ui-view/>"
    })

  $locationProvider.html5Mode(true)
  $urlRouterProvider.otherwise(function($injector, $location){
    $injector.invoke(function($state) {
      $state.go('error.404')
    })
  })
});

},{"./API_services/Services":6,"./ErrorModule/ErrorModule":7,"./Frontpage/Frontpage":10,"./Standalone/Directives":11,"./_compiled/templates":13}],2:[function(require,module,exports){
/**
 * @file Containers
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project Holdfast
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */


module.exports = angular.module('Holdfast.API.Containers',[], function($provide) {
  return $provide.factory('ContainerApi', function($q, $http) {

    return {
      getAll: function() {
        var deferred = $q.defer()
        $http.get('/api/v1/containers')
          .success(function(data, status) {
            deferred.resolve(data)
          })
          .error(function(data, status) {
            deferred.reject('Error');
          })
        return deferred.promise
      }
    }
  })
});

},{}],3:[function(require,module,exports){
/**
 * @file EventStream
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project Holdfast
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

module.exports = angular.module('Holdfast.API.Events',[], function($provide) {
  return $provide.factory('EventStream', function($rootScope) {
    var source = new EventSource('events/v1')

    source.addEventListener('open', function(evt) {
      console.log("Opened Event stream.")
    }, false);

    source.addEventListener('error', function(evt) {
      console.log('There was an error in the event-stream.');
      console.log(evt)
    }, false);

    source.addEventListener('update', function(evt) {
      $rootScope.$broadcast('data-update', JSON.parse(evt.data))
    }, false);

    return source
  })
});
},{}],4:[function(require,module,exports){
/**
 * @file Hosts
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project Holdfast
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

module.exports = angular.module('Holdfast.API.Hosts',[], function($provide) {
  return $provide.factory('HostApi', function($q, $http) {

    return {
      getAll: function() {
        var deferred = $q.defer()
        $http.get('/api/v1/hosts')
          .success(function(data, status) {
            console.log(data)
            deferred.resolve(data.data)
          })
          .error(function(data, status) {
            deferred.reject('Error');
          })
        return deferred.promise
      }
    }
  })
});
},{}],5:[function(require,module,exports){
/**
 * @file Images
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project Holdfast
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */


module.exports = angular.module('Holdfast.API.Images',[]);
},{}],6:[function(require,module,exports){
/**
 * @file Services
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project Holdfast
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */
require('./EventStream/EventStream');
require('./Containers/Containers');
require('./Hosts/Hosts');
require('./Images/Images');

var dependencies = [
  'Holdfast.API.Events',
  'Holdfast.API.Containers',
  'Holdfast.API.Hosts',
  'Holdfast.API.Images'
]

module.exports = angular.module('Holdfast.API', dependencies);
},{"./Containers/Containers":2,"./EventStream/EventStream":3,"./Hosts/Hosts":4,"./Images/Images":5}],7:[function(require,module,exports){
/**
 * @file ErrorModule
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project Holdfast
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

require('./controllers');
require('./directives');

angular.module('Holdfast.Errors', [
  'Holdfast.Errors.controllers',
  'Holdfast.Errors.directives'
])
.config(function($stateProvider) {
  $stateProvider
    .state('error', {
      abstract: true,
      url: 'error/',
      template: '<ui-view/>'
    })
    .state('error.404', {
      url: '404',
      templateUrl: 'errormodule/404'
    })
    .state('error.500', {
      url: '500',
      templateUrl: 'errormodule/500'
    })
});
},{"./controllers":8,"./directives":9}],8:[function(require,module,exports){
/**
 * @file controllers
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project Holdfast
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

angular.module("Holdfast.Errors.controllers", [])
},{}],9:[function(require,module,exports){
/**
 * @file directives
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project Holdfast
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

angular.module("Holdfast.Errors.directives", [])
},{}],10:[function(require,module,exports){
/**
 * @file Frontpage
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project Holdfast
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

angular.module('Holdfast.Frontpage', [])
  .config(function($stateProvider) {
    $stateProvider
      .state('main.frontPage',{
        url: '',
        templateUrl: "frontpage/frontpage",
        controller: function($scope, HostApi, EventStream) {
          $scope.showContainers = false;
          $scope.connectedHosts = 0
          $scope.$on('data-update', function(evt, data){
            $scope.$apply(function(){
              $scope.connectedHosts = data
            });
          });
          HostApi.getAll().then(function(data) {
            $scope.connectedHosts = data
          })
        }
      })
  });
},{}],11:[function(require,module,exports){
/**
 * @file index
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project Holdfast
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

require('./MainMenu/MainMenu')

directives = [
  'Holdfast.Directives.MainMenu'
];

angular.module('Holdfast.Directives', directives);
},{"./MainMenu/MainMenu":12}],12:[function(require,module,exports){
/**
 * @file MainMenu
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project Holdfast
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

angular.module('Holdfast.Directives.MainMenu', [])
  .directive('mainMenu', function(){
    return {
      restrict: 'E',
      templateUrl: 'mainmenu/menu',
      controller: function($state) {
        $state.name = 'Main Menu'
      }
    }
});
},{}],13:[function(require,module,exports){
'use strict'; module.exports = angular.module("Holdfast.templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("errormodule/404","<div class=\"container-fluid\"><div class=\"row\"><div class=\"col-sm-12\"><h1>Sorry, we couldn\'t find that...</h1></div></div></div>");
$templateCache.put("errormodule/500","<div class=\"container-fluid\"><div class=\"row\"><div class=\"col-sm-12\"><h1>Something went wrong, badly, and we are embarrased about it.</h1></div></div></div>");
$templateCache.put("frontpage/frontpage","<div class=\"row full-width\"><div class=\"small-12 columns\"><h3>Connected Hosts: {{connectedHosts.length}}</h3><div ng-repeat=\"host in connectedHosts\" class=\"panel\"><div class=\"panel-heading\"><p>id: {{host.instanceId}}</p></div><div class=\"panel-body\"><ul class=\"no-bullet\"><li ng-repeat=\"(image, container) in host.containers\"><div class=\"panel\"><div ng-click=\"this.showContainer = !this.showContainer\" class=\"row clickyFinger\"><div class=\"large-6 columns\"><h4>Image: {{image}}</h4></div><div class=\"large-6 columns\"><h4>{{container.length}} containers</h4></div></div><div ng-repeat=\"c in container\" class=\"row\"><div class=\"large-12 columns\"><hr ng-show=\"$first\"/><div class=\"row\"><div class=\"large-6 columns\"><h5>Manager State: {{c.ManagerData.ManagedState}}</h5></div><div class=\"large-6 columns\"><h5>Name: {{c.ManagerData.Name}}</h5></div></div><div class=\"row\"><div class=\"large-12 columns\"><h5 ng-repeat=\"(p, q) in c.container.Ports\"><pre>Ports: {{p}}</pre><pre ng-repeat=\"d in q\">  --> {{d.HostIp}}:{{d.HostPort}}</pre></h5></div></div><hr ng-hide=\"$last\"/></div></div></div></li></ul></div></div></div></div>");
$templateCache.put("mainmenu/menu","<div class=\"fixed\"><nav class=\"top-bar\"><ul class=\"title-area\"><li class=\"name\"><h1><a ui-sref=\"main.frontPage\">Holdfast</a></h1></li></ul><section class=\"top-bar-section\"><ul class=\"left\"><li><a>Hosts</a></li><li><a>Images</a></li></ul></section></nav></div>");}]);
},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi8uLi9Ib2xkZmFzdC5qcyIsIkFQSV9zZXJ2aWNlcy9Db250YWluZXJzL0NvbnRhaW5lcnMuanMiLCJBUElfc2VydmljZXMvRXZlbnRTdHJlYW0vRXZlbnRTdHJlYW0uanMiLCJBUElfc2VydmljZXMvSG9zdHMvSG9zdHMuanMiLCJBUElfc2VydmljZXMvSW1hZ2VzL0ltYWdlcy5qcyIsIkFQSV9zZXJ2aWNlcy9TZXJ2aWNlcy5qcyIsIkVycm9yTW9kdWxlL0Vycm9yTW9kdWxlLmpzIiwiRXJyb3JNb2R1bGUvY29udHJvbGxlcnMuanMiLCJFcnJvck1vZHVsZS9kaXJlY3RpdmVzLmpzIiwiRnJvbnRwYWdlL0Zyb250cGFnZS5qcyIsIlN0YW5kYWxvbmUvRGlyZWN0aXZlcy5qcyIsIlN0YW5kYWxvbmUvTWFpbk1lbnUvTWFpbk1lbnUuanMiLCJfY29tcGlsZWQvdGVtcGxhdGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxuICogQGZpbGUgSG9sZGZhc3RcbiAqIEBhdXRob3IgSmltIEJ1bGtvd3NraSA8amltLmJAcGFwZXJlbGVjdHJvbi5jb20+XG4gKiBAcHJvamVjdCBIb2xkZmFzdFxuICogQGxpY2Vuc2UgTUlUIHtAbGluayBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUfVxuICovXG5cbnJlcXVpcmUoJy4vX2NvbXBpbGVkL3RlbXBsYXRlcycpO1xucmVxdWlyZSgnLi9BUElfc2VydmljZXMvU2VydmljZXMnKVxucmVxdWlyZSgnLi9TdGFuZGFsb25lL0RpcmVjdGl2ZXMnKTtcbnJlcXVpcmUoJy4vRnJvbnRwYWdlL0Zyb250cGFnZScpO1xucmVxdWlyZSgnLi9FcnJvck1vZHVsZS9FcnJvck1vZHVsZScpO1xuXG52YXIgZGVwZW5kZW5jaWVzID0gW1xuICAnSG9sZGZhc3QudGVtcGxhdGVzJyxcbiAgJ0hvbGRmYXN0LkFQSScsXG4gICd1aS5yb3V0ZXInLFxuICAnSG9sZGZhc3QuRnJvbnRwYWdlJyxcbiAgJ0hvbGRmYXN0LkRpcmVjdGl2ZXMnLFxuICAnSG9sZGZhc3QuRXJyb3JzJ1xuXVxuXG5hbmd1bGFyLm1vZHVsZSgnSG9sZGZhc3QnLCBkZXBlbmRlbmNpZXMpLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyLCAkbG9jYXRpb25Qcm92aWRlcikge1xuICAkc3RhdGVQcm92aWRlclxuICAgIC5zdGF0ZSgnbWFpbicse1xuICAgICAgYWJzdHJhY3Q6IHRydWUsXG4gICAgICB1cmw6ICcvJyxcbiAgICAgIHRlbXBsYXRlOiBcIjxtYWluLW1lbnU+PC9tYWluLW1lbnU+PHVpLXZpZXcvPlwiXG4gICAgfSlcblxuICAkbG9jYXRpb25Qcm92aWRlci5odG1sNU1vZGUodHJ1ZSlcbiAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZShmdW5jdGlvbigkaW5qZWN0b3IsICRsb2NhdGlvbil7XG4gICAgJGluamVjdG9yLmludm9rZShmdW5jdGlvbigkc3RhdGUpIHtcbiAgICAgICRzdGF0ZS5nbygnZXJyb3IuNDA0JylcbiAgICB9KVxuICB9KVxufSk7XG4iLCIvKipcbiAqIEBmaWxlIENvbnRhaW5lcnNcbiAqIEBhdXRob3IgSmltIEJ1bGtvd3NraSA8amltLmJAcGFwZXJlbGVjdHJvbi5jb20+XG4gKiBAcHJvamVjdCBIb2xkZmFzdFxuICogQGxpY2Vuc2UgTUlUIHtAbGluayBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUfVxuICovXG5cblxubW9kdWxlLmV4cG9ydHMgPSBhbmd1bGFyLm1vZHVsZSgnSG9sZGZhc3QuQVBJLkNvbnRhaW5lcnMnLFtdLCBmdW5jdGlvbigkcHJvdmlkZSkge1xuICByZXR1cm4gJHByb3ZpZGUuZmFjdG9yeSgnQ29udGFpbmVyQXBpJywgZnVuY3Rpb24oJHEsICRodHRwKSB7XG5cbiAgICByZXR1cm4ge1xuICAgICAgZ2V0QWxsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKVxuICAgICAgICAkaHR0cC5nZXQoJy9hcGkvdjEvY29udGFpbmVycycpXG4gICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGRhdGEpXG4gICAgICAgICAgfSlcbiAgICAgICAgICAuZXJyb3IoZnVuY3Rpb24oZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoJ0Vycm9yJyk7XG4gICAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2VcbiAgICAgIH1cbiAgICB9XG4gIH0pXG59KTtcbiIsIi8qKlxuICogQGZpbGUgRXZlbnRTdHJlYW1cbiAqIEBhdXRob3IgSmltIEJ1bGtvd3NraSA8amltLmJAcGFwZXJlbGVjdHJvbi5jb20+XG4gKiBAcHJvamVjdCBIb2xkZmFzdFxuICogQGxpY2Vuc2UgTUlUIHtAbGluayBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUfVxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gYW5ndWxhci5tb2R1bGUoJ0hvbGRmYXN0LkFQSS5FdmVudHMnLFtdLCBmdW5jdGlvbigkcHJvdmlkZSkge1xuICByZXR1cm4gJHByb3ZpZGUuZmFjdG9yeSgnRXZlbnRTdHJlYW0nLCBmdW5jdGlvbigkcm9vdFNjb3BlKSB7XG4gICAgdmFyIHNvdXJjZSA9IG5ldyBFdmVudFNvdXJjZSgnZXZlbnRzL3YxJylcblxuICAgIHNvdXJjZS5hZGRFdmVudExpc3RlbmVyKCdvcGVuJywgZnVuY3Rpb24oZXZ0KSB7XG4gICAgICBjb25zb2xlLmxvZyhcIk9wZW5lZCBFdmVudCBzdHJlYW0uXCIpXG4gICAgfSwgZmFsc2UpO1xuXG4gICAgc291cmNlLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZnVuY3Rpb24oZXZ0KSB7XG4gICAgICBjb25zb2xlLmxvZygnVGhlcmUgd2FzIGFuIGVycm9yIGluIHRoZSBldmVudC1zdHJlYW0uJyk7XG4gICAgICBjb25zb2xlLmxvZyhldnQpXG4gICAgfSwgZmFsc2UpO1xuXG4gICAgc291cmNlLmFkZEV2ZW50TGlzdGVuZXIoJ3VwZGF0ZScsIGZ1bmN0aW9uKGV2dCkge1xuICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdkYXRhLXVwZGF0ZScsIEpTT04ucGFyc2UoZXZ0LmRhdGEpKVxuICAgIH0sIGZhbHNlKTtcblxuICAgIHJldHVybiBzb3VyY2VcbiAgfSlcbn0pOyIsIi8qKlxuICogQGZpbGUgSG9zdHNcbiAqIEBhdXRob3IgSmltIEJ1bGtvd3NraSA8amltLmJAcGFwZXJlbGVjdHJvbi5jb20+XG4gKiBAcHJvamVjdCBIb2xkZmFzdFxuICogQGxpY2Vuc2UgTUlUIHtAbGluayBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUfVxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gYW5ndWxhci5tb2R1bGUoJ0hvbGRmYXN0LkFQSS5Ib3N0cycsW10sIGZ1bmN0aW9uKCRwcm92aWRlKSB7XG4gIHJldHVybiAkcHJvdmlkZS5mYWN0b3J5KCdIb3N0QXBpJywgZnVuY3Rpb24oJHEsICRodHRwKSB7XG5cbiAgICByZXR1cm4ge1xuICAgICAgZ2V0QWxsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKVxuICAgICAgICAkaHR0cC5nZXQoJy9hcGkvdjEvaG9zdHMnKVxuICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSlcbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoZGF0YS5kYXRhKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmVycm9yKGZ1bmN0aW9uKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KCdFcnJvcicpO1xuICAgICAgICAgIH0pXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlXG4gICAgICB9XG4gICAgfVxuICB9KVxufSk7IiwiLyoqXG4gKiBAZmlsZSBJbWFnZXNcbiAqIEBhdXRob3IgSmltIEJ1bGtvd3NraSA8amltLmJAcGFwZXJlbGVjdHJvbi5jb20+XG4gKiBAcHJvamVjdCBIb2xkZmFzdFxuICogQGxpY2Vuc2UgTUlUIHtAbGluayBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUfVxuICovXG5cblxubW9kdWxlLmV4cG9ydHMgPSBhbmd1bGFyLm1vZHVsZSgnSG9sZGZhc3QuQVBJLkltYWdlcycsW10pOyIsIi8qKlxuICogQGZpbGUgU2VydmljZXNcbiAqIEBhdXRob3IgSmltIEJ1bGtvd3NraSA8amltLmJAcGFwZXJlbGVjdHJvbi5jb20+XG4gKiBAcHJvamVjdCBIb2xkZmFzdFxuICogQGxpY2Vuc2UgTUlUIHtAbGluayBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUfVxuICovXG5yZXF1aXJlKCcuL0V2ZW50U3RyZWFtL0V2ZW50U3RyZWFtJyk7XG5yZXF1aXJlKCcuL0NvbnRhaW5lcnMvQ29udGFpbmVycycpO1xucmVxdWlyZSgnLi9Ib3N0cy9Ib3N0cycpO1xucmVxdWlyZSgnLi9JbWFnZXMvSW1hZ2VzJyk7XG5cbnZhciBkZXBlbmRlbmNpZXMgPSBbXG4gICdIb2xkZmFzdC5BUEkuRXZlbnRzJyxcbiAgJ0hvbGRmYXN0LkFQSS5Db250YWluZXJzJyxcbiAgJ0hvbGRmYXN0LkFQSS5Ib3N0cycsXG4gICdIb2xkZmFzdC5BUEkuSW1hZ2VzJ1xuXVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFuZ3VsYXIubW9kdWxlKCdIb2xkZmFzdC5BUEknLCBkZXBlbmRlbmNpZXMpOyIsIi8qKlxuICogQGZpbGUgRXJyb3JNb2R1bGVcbiAqIEBhdXRob3IgSmltIEJ1bGtvd3NraSA8amltLmJAcGFwZXJlbGVjdHJvbi5jb20+XG4gKiBAcHJvamVjdCBIb2xkZmFzdFxuICogQGxpY2Vuc2UgTUlUIHtAbGluayBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUfVxuICovXG5cbnJlcXVpcmUoJy4vY29udHJvbGxlcnMnKTtcbnJlcXVpcmUoJy4vZGlyZWN0aXZlcycpO1xuXG5hbmd1bGFyLm1vZHVsZSgnSG9sZGZhc3QuRXJyb3JzJywgW1xuICAnSG9sZGZhc3QuRXJyb3JzLmNvbnRyb2xsZXJzJyxcbiAgJ0hvbGRmYXN0LkVycm9ycy5kaXJlY3RpdmVzJ1xuXSlcbi5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIpIHtcbiAgJHN0YXRlUHJvdmlkZXJcbiAgICAuc3RhdGUoJ2Vycm9yJywge1xuICAgICAgYWJzdHJhY3Q6IHRydWUsXG4gICAgICB1cmw6ICdlcnJvci8nLFxuICAgICAgdGVtcGxhdGU6ICc8dWktdmlldy8+J1xuICAgIH0pXG4gICAgLnN0YXRlKCdlcnJvci40MDQnLCB7XG4gICAgICB1cmw6ICc0MDQnLFxuICAgICAgdGVtcGxhdGVVcmw6ICdlcnJvcm1vZHVsZS80MDQnXG4gICAgfSlcbiAgICAuc3RhdGUoJ2Vycm9yLjUwMCcsIHtcbiAgICAgIHVybDogJzUwMCcsXG4gICAgICB0ZW1wbGF0ZVVybDogJ2Vycm9ybW9kdWxlLzUwMCdcbiAgICB9KVxufSk7IiwiLyoqXG4gKiBAZmlsZSBjb250cm9sbGVyc1xuICogQGF1dGhvciBKaW0gQnVsa293c2tpIDxqaW0uYkBwYXBlcmVsZWN0cm9uLmNvbT5cbiAqIEBwcm9qZWN0IEhvbGRmYXN0XG4gKiBAbGljZW5zZSBNSVQge0BsaW5rIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVR9XG4gKi9cblxuYW5ndWxhci5tb2R1bGUoXCJIb2xkZmFzdC5FcnJvcnMuY29udHJvbGxlcnNcIiwgW10pIiwiLyoqXG4gKiBAZmlsZSBkaXJlY3RpdmVzXG4gKiBAYXV0aG9yIEppbSBCdWxrb3dza2kgPGppbS5iQHBhcGVyZWxlY3Ryb24uY29tPlxuICogQHByb2plY3QgSG9sZGZhc3RcbiAqIEBsaWNlbnNlIE1JVCB7QGxpbmsgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVH1cbiAqL1xuXG5hbmd1bGFyLm1vZHVsZShcIkhvbGRmYXN0LkVycm9ycy5kaXJlY3RpdmVzXCIsIFtdKSIsIi8qKlxuICogQGZpbGUgRnJvbnRwYWdlXG4gKiBAYXV0aG9yIEppbSBCdWxrb3dza2kgPGppbS5iQHBhcGVyZWxlY3Ryb24uY29tPlxuICogQHByb2plY3QgSG9sZGZhc3RcbiAqIEBsaWNlbnNlIE1JVCB7QGxpbmsgaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVH1cbiAqL1xuXG5hbmd1bGFyLm1vZHVsZSgnSG9sZGZhc3QuRnJvbnRwYWdlJywgW10pXG4gIC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIpIHtcbiAgICAkc3RhdGVQcm92aWRlclxuICAgICAgLnN0YXRlKCdtYWluLmZyb250UGFnZScse1xuICAgICAgICB1cmw6ICcnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogXCJmcm9udHBhZ2UvZnJvbnRwYWdlXCIsXG4gICAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCRzY29wZSwgSG9zdEFwaSwgRXZlbnRTdHJlYW0pIHtcbiAgICAgICAgICAkc2NvcGUuc2hvd0NvbnRhaW5lcnMgPSBmYWxzZTtcbiAgICAgICAgICAkc2NvcGUuY29ubmVjdGVkSG9zdHMgPSAwXG4gICAgICAgICAgJHNjb3BlLiRvbignZGF0YS11cGRhdGUnLCBmdW5jdGlvbihldnQsIGRhdGEpe1xuICAgICAgICAgICAgJHNjb3BlLiRhcHBseShmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAkc2NvcGUuY29ubmVjdGVkSG9zdHMgPSBkYXRhXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBIb3N0QXBpLmdldEFsbCgpLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgJHNjb3BlLmNvbm5lY3RlZEhvc3RzID0gZGF0YVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0pXG4gIH0pOyIsIi8qKlxuICogQGZpbGUgaW5kZXhcbiAqIEBhdXRob3IgSmltIEJ1bGtvd3NraSA8amltLmJAcGFwZXJlbGVjdHJvbi5jb20+XG4gKiBAcHJvamVjdCBIb2xkZmFzdFxuICogQGxpY2Vuc2UgTUlUIHtAbGluayBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUfVxuICovXG5cbnJlcXVpcmUoJy4vTWFpbk1lbnUvTWFpbk1lbnUnKVxuXG5kaXJlY3RpdmVzID0gW1xuICAnSG9sZGZhc3QuRGlyZWN0aXZlcy5NYWluTWVudSdcbl07XG5cbmFuZ3VsYXIubW9kdWxlKCdIb2xkZmFzdC5EaXJlY3RpdmVzJywgZGlyZWN0aXZlcyk7IiwiLyoqXG4gKiBAZmlsZSBNYWluTWVudVxuICogQGF1dGhvciBKaW0gQnVsa293c2tpIDxqaW0uYkBwYXBlcmVsZWN0cm9uLmNvbT5cbiAqIEBwcm9qZWN0IEhvbGRmYXN0XG4gKiBAbGljZW5zZSBNSVQge0BsaW5rIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVR9XG4gKi9cblxuYW5ndWxhci5tb2R1bGUoJ0hvbGRmYXN0LkRpcmVjdGl2ZXMuTWFpbk1lbnUnLCBbXSlcbiAgLmRpcmVjdGl2ZSgnbWFpbk1lbnUnLCBmdW5jdGlvbigpe1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgdGVtcGxhdGVVcmw6ICdtYWlubWVudS9tZW51JyxcbiAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCRzdGF0ZSkge1xuICAgICAgICAkc3RhdGUubmFtZSA9ICdNYWluIE1lbnUnXG4gICAgICB9XG4gICAgfVxufSk7IiwiJ3VzZSBzdHJpY3QnOyBtb2R1bGUuZXhwb3J0cyA9IGFuZ3VsYXIubW9kdWxlKFwiSG9sZGZhc3QudGVtcGxhdGVzXCIsIFtdKS5ydW4oW1wiJHRlbXBsYXRlQ2FjaGVcIiwgZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpIHskdGVtcGxhdGVDYWNoZS5wdXQoXCJlcnJvcm1vZHVsZS80MDRcIixcIjxkaXYgY2xhc3M9XFxcImNvbnRhaW5lci1mbHVpZFxcXCI+PGRpdiBjbGFzcz1cXFwicm93XFxcIj48ZGl2IGNsYXNzPVxcXCJjb2wtc20tMTJcXFwiPjxoMT5Tb3JyeSwgd2UgY291bGRuXFwndCBmaW5kIHRoYXQuLi48L2gxPjwvZGl2PjwvZGl2PjwvZGl2PlwiKTtcbiR0ZW1wbGF0ZUNhY2hlLnB1dChcImVycm9ybW9kdWxlLzUwMFwiLFwiPGRpdiBjbGFzcz1cXFwiY29udGFpbmVyLWZsdWlkXFxcIj48ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPjxkaXYgY2xhc3M9XFxcImNvbC1zbS0xMlxcXCI+PGgxPlNvbWV0aGluZyB3ZW50IHdyb25nLCBiYWRseSwgYW5kIHdlIGFyZSBlbWJhcnJhc2VkIGFib3V0IGl0LjwvaDE+PC9kaXY+PC9kaXY+PC9kaXY+XCIpO1xuJHRlbXBsYXRlQ2FjaGUucHV0KFwiZnJvbnRwYWdlL2Zyb250cGFnZVwiLFwiPGRpdiBjbGFzcz1cXFwicm93IGZ1bGwtd2lkdGhcXFwiPjxkaXYgY2xhc3M9XFxcInNtYWxsLTEyIGNvbHVtbnNcXFwiPjxoMz5Db25uZWN0ZWQgSG9zdHM6IHt7Y29ubmVjdGVkSG9zdHMubGVuZ3RofX08L2gzPjxkaXYgbmctcmVwZWF0PVxcXCJob3N0IGluIGNvbm5lY3RlZEhvc3RzXFxcIiBjbGFzcz1cXFwicGFuZWxcXFwiPjxkaXYgY2xhc3M9XFxcInBhbmVsLWhlYWRpbmdcXFwiPjxwPmlkOiB7e2hvc3QuaW5zdGFuY2VJZH19PC9wPjwvZGl2PjxkaXYgY2xhc3M9XFxcInBhbmVsLWJvZHlcXFwiPjx1bCBjbGFzcz1cXFwibm8tYnVsbGV0XFxcIj48bGkgbmctcmVwZWF0PVxcXCIoaW1hZ2UsIGNvbnRhaW5lcikgaW4gaG9zdC5jb250YWluZXJzXFxcIj48ZGl2IGNsYXNzPVxcXCJwYW5lbFxcXCI+PGRpdiBuZy1jbGljaz1cXFwidGhpcy5zaG93Q29udGFpbmVyID0gIXRoaXMuc2hvd0NvbnRhaW5lclxcXCIgY2xhc3M9XFxcInJvdyBjbGlja3lGaW5nZXJcXFwiPjxkaXYgY2xhc3M9XFxcImxhcmdlLTYgY29sdW1uc1xcXCI+PGg0PkltYWdlOiB7e2ltYWdlfX08L2g0PjwvZGl2PjxkaXYgY2xhc3M9XFxcImxhcmdlLTYgY29sdW1uc1xcXCI+PGg0Pnt7Y29udGFpbmVyLmxlbmd0aH19IGNvbnRhaW5lcnM8L2g0PjwvZGl2PjwvZGl2PjxkaXYgbmctcmVwZWF0PVxcXCJjIGluIGNvbnRhaW5lclxcXCIgY2xhc3M9XFxcInJvd1xcXCI+PGRpdiBjbGFzcz1cXFwibGFyZ2UtMTIgY29sdW1uc1xcXCI+PGhyIG5nLXNob3c9XFxcIiRmaXJzdFxcXCIvPjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+PGRpdiBjbGFzcz1cXFwibGFyZ2UtNiBjb2x1bW5zXFxcIj48aDU+TWFuYWdlciBTdGF0ZToge3tjLk1hbmFnZXJEYXRhLk1hbmFnZWRTdGF0ZX19PC9oNT48L2Rpdj48ZGl2IGNsYXNzPVxcXCJsYXJnZS02IGNvbHVtbnNcXFwiPjxoNT5OYW1lOiB7e2MuTWFuYWdlckRhdGEuTmFtZX19PC9oNT48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPjxkaXYgY2xhc3M9XFxcImxhcmdlLTEyIGNvbHVtbnNcXFwiPjxoNSBuZy1yZXBlYXQ9XFxcIihwLCBxKSBpbiBjLmNvbnRhaW5lci5Qb3J0c1xcXCI+PHByZT5Qb3J0czoge3twfX08L3ByZT48cHJlIG5nLXJlcGVhdD1cXFwiZCBpbiBxXFxcIj4gIC0tPiB7e2QuSG9zdElwfX06e3tkLkhvc3RQb3J0fX08L3ByZT48L2g1PjwvZGl2PjwvZGl2PjxociBuZy1oaWRlPVxcXCIkbGFzdFxcXCIvPjwvZGl2PjwvZGl2PjwvZGl2PjwvbGk+PC91bD48L2Rpdj48L2Rpdj48L2Rpdj48L2Rpdj5cIik7XG4kdGVtcGxhdGVDYWNoZS5wdXQoXCJtYWlubWVudS9tZW51XCIsXCI8ZGl2IGNsYXNzPVxcXCJmaXhlZFxcXCI+PG5hdiBjbGFzcz1cXFwidG9wLWJhclxcXCI+PHVsIGNsYXNzPVxcXCJ0aXRsZS1hcmVhXFxcIj48bGkgY2xhc3M9XFxcIm5hbWVcXFwiPjxoMT48YSB1aS1zcmVmPVxcXCJtYWluLmZyb250UGFnZVxcXCI+SG9sZGZhc3Q8L2E+PC9oMT48L2xpPjwvdWw+PHNlY3Rpb24gY2xhc3M9XFxcInRvcC1iYXItc2VjdGlvblxcXCI+PHVsIGNsYXNzPVxcXCJsZWZ0XFxcIj48bGk+PGE+SG9zdHM8L2E+PC9saT48bGk+PGE+SW1hZ2VzPC9hPjwvbGk+PC91bD48L3NlY3Rpb24+PC9uYXY+PC9kaXY+XCIpO31dKTsiXX0=
