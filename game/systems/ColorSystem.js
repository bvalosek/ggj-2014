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

    var t = entity.colorSpirit.target;
    var cs = entity.colorSpirit;

    cs.cooldown = Math.max(0, cs.cooldown - dt);

    var a = 1; b = 1 - a;
    entity.colorSpirit.set(
      t.r * a + cs.red * b,
      t.g * a + cs.green * b,
      t.b * a + cs.blue * b
    );
  }
};



