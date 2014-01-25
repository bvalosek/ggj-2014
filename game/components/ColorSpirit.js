module.exports = ColorSpirit;

/**
 * @constructor
 */
function ColorSpirit()
{
  this.red   = 0;
  this.blue  = 0;
  this.green = 0;
}

/**
 * @param {Number} r
 * @param {Number} g
 * @param {Number} b
 * @return {ColorSpirit}
 */
ColorSpirit.prototype.set = function(r, g, b)
{
  this.red   = Math.min(255, 0|r);
  this.green = Math.min(255, 0|g);
  this.blue  = Math.min(255, 0|b);
  return this;
};



