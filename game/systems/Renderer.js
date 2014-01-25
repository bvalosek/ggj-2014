module.exports = Renderer;

var EntityManager = require('tiny-ecs').EntityManager;
var Vec2          = require('tiny-ecs').Vec2;
var Style         = require('../../lib/renderer/Style.js');
var Canvas        = require('../../lib/renderer/Canvas.js');
var Position      = require('../components/Position.js');
var Spatial       = require('../components/Spatial.js');
var LevelObject   = require('../components/LevelObject.js');
var ColorSpirit   = require('../components/ColorSpirit.js');
var Avatar        = require('../components/Avatar.js');

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

var COLOR_FILTER = [Position, Spatial, ColorSpirit];
var LEVEL_FILTER = [Position, LevelObject];

// All avatars have to have a color spirit
var AVATAR_FILTER = [Position, Spatial, Avatar, ColorSpirit];

/**
 * @param {Number} dt
 * @param {Number} time
 */
Renderer.prototype.update = function(dt, time)
{
  this.drawColorEntities();
  this.drawLevelObjects();
  this.drawAvatars();
};

Renderer.prototype.drawAvatars = function()
{

};

Renderer.prototype.drawLevelObjects = function()
{
  var entities = this.entities.queryComponents(LEVEL_FILTER);
  var screen = this.screen;

  for (var n = 0; n < entities.length; n++) {
    var entity = entities[n];

    if (entity.levelObject.type === LevelObject.types.PLAYER_START)
      this.drawStart(entity);
  }
};

Renderer.prototype.drawColorEntities = function()
{
  var entities = this.entities.queryComponents(COLOR_FILTER);
  var screen = this.screen;

  for (var n = 0; n < entities.length; n++) {
    var entity = entities[n];

    if (entity.levelObject &&
      entity.levelObject.type === LevelObject.types.GEM) {
      this.drawGem(entity);
    } else {
      this.drawWall(entity);
    }

    if (entity.text) {
      this.drawText(entity);
    }
  }
};

var startSize = new Vec2(25, 25);
var startStyle = new Style()
startStyle.stroke = '#fff';
startStyle.strokeWidth = 2;

var textStyle = new Style();
textStyle.color = '#fff';

Renderer.prototype.drawText = function(entity)
{
  this.screen
    .save()
    .vtranslate(entity.position.location)
    .drawText(entity.text.value, textStyle)
    .restore();
}

Renderer.prototype.drawStart = function(entity)
{
  this.screen
    .save()
    .vtranslate(entity.position.location)
    .drawHwRect(startSize, startStyle)
    .restore();
};

Renderer.prototype.drawGem = function(entity)
{
  this.screen
    .save()
    .vtranslate(entity.position.location)
    .drawCircle(entity.spatial.hwidth.x, entity.colorSpirit.style)
    .restore();
};

Renderer.prototype.drawWall = function(entity)
{
  this.screen
    .save()
    .vtranslate(entity.position.location)
    .drawHwRect(entity.spatial.hwidth, entity.colorSpirit.style)
    .restore();
};



