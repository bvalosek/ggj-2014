module.exports = Steering;

var Vec2 = require('tiny-ecs').Vec2;

/**
 * A weighted desired direction
 * @constructor
 */
function Steering()
{
  this.direction = new Vec2();
}

Steering.prototype.__init = function()
{
  this.direction.clear();
};



