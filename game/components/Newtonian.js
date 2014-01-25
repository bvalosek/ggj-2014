module.exports = Newtonian;

var Vec2 = require('tiny-ecs').Vec2;

/**
 * @constructor
 */
function Newtonian()
{
  this.velocity     = new Vec2();
  this.acceleration = new Vec2();
  this.rotation     = 0;
  this.maxSpeed     = 0;
}

Newtonian.prototype.__init = function()
{
  this.velocity.clear();
  this.acceleration.clear();
  this.rotation = 0;
  this.maxSpeed = 0;
};



