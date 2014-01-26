module.exports = Finish;

var Color      = require('../../lib/renderer/Color.js');
var colors     = require('../maps/colors.js');
var Style      = require('../../lib/renderer/Style.js');

/**
 * @constructor
 */
function Finish()
{
  this.finished = false;
  this.timeOut = 0;
}



