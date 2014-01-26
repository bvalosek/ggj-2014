module.exports = Finish;

var Color      = require('../../lib/renderer/Color.js');
var colors     = require('../maps/colors.js');
var Style      = require('../../lib/renderer/Style.js');

/**
 * @constructor
 */
function Finish()
{
  this.isFinishing = false;
  this.color = colors.gray;
  this.style = new Style();
  this.style.color = Color.tohtml(this.color);
  this.style.stroke = Color.tohtml(this.color);
  this.style.strokeWidth = 5;
}



