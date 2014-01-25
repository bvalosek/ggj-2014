module.exports = SteeringSystem;

/**
 * Mutate the newtonian component of an entity to correspond to the expressed
 * steering vector.
 * @constructor
 */
function SteeringSystem(entities)
{
  this.entities = entities;
}

SteeringSystem.prototype.update = function(dt, time)
{
  var player = this.entities.queryTag('player')[0];
};



