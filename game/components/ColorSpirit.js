module.exports = ColorSpirit;

var Style = require('../../lib/renderer/Style.js');

/**
 * @constructor
 */
function ColorSpirit()
{
  this.red   = 0;
  this.blue  = 0;
  this.green = 0;

  this.style = new Style();
}

ColorSpirit.prototype.__init = function()
{
  // TODO: reset style for no leaks
};

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

  var color = 'rgb(' +
    this.red + ',' +
    this.green + ',' +
    this.blue + ')';


  global.color = this.style.color = color;

  return this;
};


