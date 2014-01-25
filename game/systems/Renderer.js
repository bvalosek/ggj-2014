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
  this.drawWalls();
  this.drawGems();
  this.drawAvatars();
};

Renderer.prototype.drawWalls = function()
{
  var entities = this.entities.queryTag('wall');
  for (var n = 0; n < entities.length; n++) {
    this.drawWall(entities[n]);
  }
};

Renderer.prototype.drawWall = function(entity)
{
  this.screen
    .save()
    .vtranslate(entity.position.location)
    .drawHwRect(entity.spatial.hwidth, entity.colorSpirit.style)
    .restore();
};

Renderer.prototype.drawGems = function()
{
  var entities = this.entities.queryTag('gem');
  for (var n = 0; n < entities.length; n++) {
    var entity = entities[n];
    this.drawGem(entity);
  }
};

Renderer.prototype.drawGem = function(entity)
{
  this.screen
    .save()
    .vtranslate(entity.position.location)
    .drawCircle(entity.spatial.hwidth.x, entity.colorSpirit.style)
    .restore();
};

Renderer.prototype.drawAvatars = function()
{
  var entities = this.entities.queryComponents(AVATAR_FILTER);

  for (var n = 0; n < entities.length; n++) {
    var entity = entities[n];
    this.drawAvatar(entity);
  }
};

Renderer.prototype.drawAvatar = function(entity)
{
  this.drawWall(entity);
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


var startSize = new Vec2(25, 25);
var startStyle = new Style()
startStyle.stroke = '#fff';
startStyle.strokeWidth = 2;
Renderer.prototype.drawStart = function(entity)
{
  this.screen
    .save()
    .vtranslate(entity.position.location)
    .drawHwRect(startSize, startStyle)
    .restore();
};




