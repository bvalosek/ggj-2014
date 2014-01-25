module.exports = Camera;

var Canvas = require('../../lib/renderer/Canvas.js');

/**
 * @constructor
 */
function Camera()
{
  /**
   * @type {Canvas}
   */
  this.canvas = null;
  this.scale  = 1;
}



