module.exports = EcsService;

var EntityManager = require('tiny-ecs').EntityManager;
var getName       = require('typedef').getName;

var Systems = [
  require('../systems/SpatialIndexer.js')
];

/**
 * Entity Component Systems
 * @constructor
 */
function EcsService(container)
{
  this.entities = new EntityManager(function(T) {
    return container.make(T);
  });
  container.shared('entities', this.entities);
  container.shared('ecs', this);

  this.systems = Systems.map(function(T) {
    var name = getName(T).charAt(0).toLowerCase() + getName(T).slice(1);
    var sys = container.make(T);
    container.registerInstance(name, sys);
    return sys;
  });
}

/**
 * Update all systems
 * @param {Number} dt
 * @param {Number} dt
 */
EcsService.prototype.update = function(dt, time)
{
  for (var n = 0; n < this.systems.length; n++) {
    var system = this.systems[n];
    if (system.update)
      system.update(dt, time);
  }
};


