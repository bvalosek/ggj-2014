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
var Text          = require('../components/Text.js');

/**
 * @constructor
 * @param {EntityManager} entities
 * @param {Canvas} screen
 */
function Renderer(screen, entities, maps)
{
  this.screen     = screen;
  this.entities   = entities;
  this.maps       = maps;
  global.renderer = this;
}

var COLOR_FILTER = [Position, Spatial, ColorSpirit];
var LEVEL_FILTER = [Position, LevelObject];

var TEXT_FILTER = [Position, Text];

// All avatars have to have a color spirit
var AVATAR_FILTER = [Position, Spatial, Avatar, ColorSpirit];

/**
 * @param {Number} dt
 * @param {Number} time
 */
Renderer.prototype.update = function(dt, time)
{
  this.screen.save();
  this.screen.fill('#202020');
  this.cameraTransform();
  this.drawBg();
  this.drawWalls();
  this.drawGems(dt, time);
  this.drawLevelObjects();
  this.drawAvatars();
  // this.drawTexts();
  this.screen.restore();
};

var borderStyle = new Style();
borderStyle.color = '#333';
var bV = new Vec2();
Renderer.prototype.drawBg = function()
{
  var player = this.entities.queryTag('player')[0];
  var pad = 30;
  bV.assign(this.maps.size);
  bV.x += pad*2;
  bV.y += pad*2;
  this.screen.save();
  this.screen.save();
  this.screen.translate(-pad, -pad);
  this.screen.drawRectangle(bV, borderStyle);
  this.screen.restore();
  this.screen.drawRectangle(this.maps.size, player.colorSpirit.style);
  this.screen.restore();
};

var ct = new Vec2();
Renderer.prototype.cameraTransform = function()
{
  var player = this.entities.queryTag('player')[0];

  // cacl zoom
  var zoom = this.zoom || 1;
  var per = player.newtonian.velocity.magnitude() / player.newtonian.maxSpeed;

  // do zoom
  var p = 0.992;
  var newZoom = 2 - 1 * per;
  zoom = zoom * p + (1-p) * newZoom;
  this.screen.scale(zoom, zoom);
  this.zoom = zoom;

  // Translate to account for player
  ct.assign(this.screen.getSize()).smult(0.5 * (1/zoom));
  this.screen.vtranslate(ct);
  ct.assign(player.position.location).smult(-1);
  this.screen.vtranslate(ct);

};

Renderer.prototype.drawTexts = function()
{
  var entities = this.entities.queryComponents(TEXT_FILTER);

  for (var n = 0; n < entities.length; n++) {
    this.drawText(entities[n]);
  }
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

Renderer.prototype.drawGems = function(dt, time)
{
  var entities = this.entities.queryTag('gem');
  for (var n = 0; n < entities.length; n++) {
    var entity = entities[n];
    this.drawGem(entity, dt, time);
  }
};

Renderer.prototype.drawGem = function(entity, dt, time)
{
  var wiggle = Math.sin(5*time/1000) * 2 + 2;
  this.screen
    .save()
    .vtranslate(entity.position.location)
    .drawCircle(entity.spatial.hwidth.x + wiggle, entity.colorSpirit.style)
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

var vh = new Vec2();
var playerStyle = new Style();
playerStyle.color = '#fff';
Renderer.prototype.drawAvatar = function(entity)
{
  var h = Vec2.aquire();
  var pos = Vec2.aquire();

  h.assign(entity.spatial.hwidth);
  h.y *= 0.5;
  pos.set(entity.spatial.hwidth.x/2.2, 0);

  this.screen
    .save()
    .vtranslate(entity.position.location)
    .rotate(entity.position.rotation)
    .drawHwRect(entity.spatial.hwidth, playerStyle)
    .vtranslate(pos)
    .drawHwRect(h, playerStyle)
    .restore();

  Vec2.release(h);
  Vec2.release(pos);
};

Renderer.prototype.drawLevelObjects = function()
{
  var entities = this.entities.queryComponents(LEVEL_FILTER);
  var screen = this.screen;

  for (var n = 0; n < entities.length; n++) {
    var entity = entities[n];

    if (entity.levelObject.type === LevelObject.types.PLAYER_START)
      this.drawStart(entity);

    if (entity.levelObject.type === LevelObject.types.LEVEL_FINISH)
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
startStyle.stroke = '#333';
startStyle.strokeWidth = 5;
Renderer.prototype.drawStart = function(entity)
{
  this.screen
    .save()
    .vtranslate(entity.position.location)
    //.drawHwRect(startSize, startStyle)
    .drawCircle(50, startStyle)
    .restore();
};




