module.exports = ColorSystem;

var ColorSpirit = require('../components/ColorSpirit.js');

/**
 * @constructor
 */
function ColorSystem(entities)
{
  this.entities = entities;
}

var FILTER = [ColorSpirit];

ColorSystem.prototype.update = function(dt, time)
{
  var entities = this.entities.queryComponents(FILTER);

  for (var n = 0; n < entities.length; n++) {
    var entity = entities[n];

  }
};



