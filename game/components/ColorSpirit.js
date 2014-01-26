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

  this.cooldown = 0;

  this.target = {
    r: 0, g: 0, b: 0
  }

  this.style = new Style();
}

ColorSpirit.prototype.setBoth = function(r, g, b)
{
  if (r && r.r !== undefined) {
    b = r.b;
    g = r.g;
    r = r.r;
  }
  this.target.r = this.red = r;
  this.target.g = this.green = g;
  this.target.b = this.blue = b;
};

ColorSpirit.prototype.setTarget = function(r, g, b)
{
  if (r && r.r !== undefined) {
    b = r.b;
    g = r.g;
    r = r.r;
  }

  this.target.r = r;
  this.target.g = g;
  this.target.b = b;
};

ColorSpirit.prototype.toColor = function()
{
  return {
    r: this.red,
    g: this.green,
    b: this.blue
  };
};

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
  if (r && r.r !== undefined) {
    b = r.b;
    g = r.g;
    r = r.r;
  }

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


