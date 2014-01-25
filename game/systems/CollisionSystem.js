module.exports = CollisionSystem;

var Position = require('../components/Position.js');
var Spatial  = require('../components/Spatial.js');

/**
 * @constructor
 */
function CollisionSystem(entities)
{
  this.entities = entities;
}

var FILTER = [Position, Spatial];

CollisionSystem.prototype.update = function(dt, time)
{
  var entities = this.entities.queryComponents(FILTER);
  var player = this.entities.queryTag('player')[0];

  // brute force, only check player
  for (var n = 0; n < entities.length; n++) {
    var entity = entities[n];
    if (entity === player) continue;

  }
};

