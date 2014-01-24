module.exports = Position;

var Vec2 = require('tiny-ecs').Vec2;

/**
 * Location and rotation of an object.
 * @constructor
 */
function Position()
{
  this.location = new Vec2();
  this.rotation = 0;
}

/**
 * Reset for pool.
 */
Position.prototype.__init = function()
{
  this.location.clear();
  this.rotation = 0;
};



