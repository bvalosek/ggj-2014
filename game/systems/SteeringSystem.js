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
  var heading = player.steering.heading;

  var v   = player.newtonian.velocity;
  var a   = player.newtonian.acceleration;
  var dec = player.steering.deceleration;

  var m = heading.magnitude();

  if (m > 0) {
    a.assign(heading).smult(50);
  } else {
    a.assign(v).smult(dec * -1);
  }

  player.position.rotation = v.angle();

};



