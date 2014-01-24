module.exports = Spatial;

var Vec2     = require('tiny-ecs').Vec2;
var QuadTree = require('tiny-ecs').QuadTree;

/**
 * Represents something taking up a certain amount of space as a rectangle
 * described by a Vec2 of halfwidths.
 * @constructor
 */
function Spatial()
{
  this.hwidth = new Vec2();

  /**
   * @type {QuadTree}
   */
  this._node = null;

  /**
   * @type {QuadTree.Entry}
   */
  this._entry = null;
}

/**
 * Reset for pool.
 */
Spatial.prototype.__init = function()
{
  this.hwidth.clear();
  this._node = null;
  this._entry = null;
};



