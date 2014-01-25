module.exports = Physics;

var EntityManager = require('tiny-ecs').EntityManager;
var Vec2          = require('tiny-ecs').Vec2;
var Position      = require('../components/Position.js');
var Newtonian     = require('../components/Newtonian.js');

/**
 * Evolve position w/ velocity.
 * @param {EntityManager} entities
 * @constructor
 */
function Physics(entities)
{
  this.entities = entities;
}

var FILTER = [Position, Newtonian];

Physics.prototype.update = function(dt, time)
{
  var entities = this.entities.queryComponents(FILTER);

  var t = dt/1000;

  for (var n = 0; n < entities.length; n++) {
    var entity = entities[n];
    var v   = entity.newtonian.velocity;
    var a   = entity.newtonian.acceleration;
    var pos = entity.position.location;

    v.x += a.x * t;
    v.y += a.y * t;

    pos.x += v.x * t;
    pos.y += v.y * t;
  }
};



