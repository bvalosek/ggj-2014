module.exports = Newtonian;

/**
 * @constructor
 */
function Newtonian()
{
  this.velocity = new Vec2();
  this.acceleration = new Vec2();
  this.rotation = 0;
}

Newtonian.prototype.__init = function()
{
  this.velocity.clear();
  this.acceleration.clear();
  this.rotation = 0;
};



