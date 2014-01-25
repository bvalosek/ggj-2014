module.exports = Renderer;

var EntityManager = require('tiny-ecs').EntityManager;
var Canvas        = require('../../lib/renderer/Canvas.js');
var Position      = require('../components/Position.js');
var Spatial       = require('../components/Spatial.js');

/**
 * @constructor
 * @param {EntityManager} entities
 * @param {Canvas} screen
 */
function Renderer(screen, entities)
{
  this.screen   = screen;
  this.entities = entities;
  global.renderer = this;
}

var FILTER = [Position, Spatial];

/**
 * @param {Number} dt
 * @param {Number} time
 */
Renderer.prototype.update = function(dt, time)
{
  var entities = this.entities.queryComponents(FILTER);
  var screen = this.screen;

  for (var n = 0; n < entities.length; n++) {
    var entity = entities[n];

    if (entity.colorSpirit) {
      screen
        .save()
        .vtranslate(entity.position.location)
        .drawHwRect(entity.spatial.hwidth,
          entity.colorSpirit.style)
        .restore();
    }

  }
};



