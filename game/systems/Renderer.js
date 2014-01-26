module.exports = Renderer;

var EntityManager = require('tiny-ecs').EntityManager;
var Vec2          = require('tiny-ecs').Vec2;
var Style         = require('../../lib/renderer/Style.js');
var Canvas        = require('../../lib/renderer/Canvas.js');
var Position      = require('../components/Position.js');
var Spatial       = require('../components/Spatial.js');
var LevelObject   = require('../components/LevelObject.js');
var ColorSpirit   = require('../components/ColorSpirit.js');
var Color         = require('../../lib/renderer/Color.js');
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
  this.drawLevelObjects(dt, time);
  this.drawAvatars();
  // this.drawTexts();
  this.screen.restore();
};

var bV = new Vec2();

var borderStyle = new Style();
borderStyle.color = '#333';

var datStyle = new Style();
datStyle.color = '#222';

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
  this.screen.drawRectangle(this.maps.size, datStyle);
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
  var p = 0.995;
  var newZoom = 1.2 - 0.2 * per;
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
  var pColor = this.entities.queryTag('player')[0].colorSpirit.toColor();

  for (var n = 0; n < entities.length; n++) {
    var entity = entities[n];
    var wColor = entity.colorSpirit.toColor();
    if (Color.equals(pColor, wColor)) {
      this.screen.save().setAlpha(0.1);
      this.drawWall(entities[n]);
      this.screen.restore();
    }
  }

  for (var n = 0; n < entities.length; n++) {
    var entity = entities[n];
    var wColor = entity.colorSpirit.toColor();
    if (!Color.equals(pColor, wColor))
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

var disabledGemStyle = new Style();
disabledGemStyle.color = '#555';
Renderer.prototype.drawGem = function(entity, dt, time)
{
  var disabled = !!entity.colorSpirit.cooldown;
  var gemSize = entity.spatial.hwidth.x;
  var mult = gemSize / 4;
  var wiggle = Math.sin(5*time/1000) * mult + mult;

  if (disabled) {
    wiggle = wiggle*0.5 + -5 + 5 * (1 - entity.colorSpirit.cooldown/1500);
  }

  var style = disabled ? disabledGemStyle : entity.colorSpirit.style;

  this.screen
    .save()
    .vtranslate(entity.position.location)
    .drawCircle(entity.spatial.hwidth.x + wiggle, style)
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
var shipsize = 15;
//playerStyle.fillStyle = '#EEE';
Renderer.prototype.drawAvatar = function(entity)
{
  var h = Vec2.aquire();
  var pos = Vec2.aquire();

  var player = this.entities.queryTag(['player'])[0];

  h.assign(entity.spatial.hwidth);
  h.y *= 0.5;
  pos.set(entity.spatial.hwidth.x/2.2, 0);

  this.screen
    .save()
    .vtranslate(entity.position.location)
    .rotate(entity.position.rotation)
    //.drawHwRect(entity.spatial.hwidth, playerStyle)
    .drawShape(
      [ {x:-shipsize, y:shipsize}, {x:shipsize,y:0}, {x:-shipsize,y:-shipsize}]
      , player.colorSpirit.style)
    /*
    .save()
    .scale(0.5, 0.5)
    .drawShape(
      [ {x:-shipsize, y:shipsize}, {x:shipsize,y:0}, {x:-shipsize,y:-shipsize}]
      , player.colorSpirit.style)
    .restore()
    */


    //.vtranslate(pos)
    //.drawHwRect(h, playerStyle)
    .restore();

  Vec2.release(h);
  Vec2.release(pos);
};

Renderer.prototype.drawLevelObjects = function(dt, time)
{
  var entities = this.entities.queryComponents(LEVEL_FILTER);
  var screen = this.screen;

  for (var n = 0; n < entities.length; n++) {
    var entity = entities[n];

    if (entity.levelObject.type === LevelObject.types.PLAYER_START)
      this.drawStart(entity, dt, time);

    if (entity.levelObject.type === LevelObject.types.LEVEL_FINISH)
      this.drawStart(entity, dt, time);
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
startStyle.strokeWidth = 5;
Renderer.prototype.drawStart = function(entity, dt, time)
{
  this.screen
    .save()
    .setAlpha(0.3 + 0.2 *Math.cos(time / 1000))
    .vtranslate(entity.position.location)
    //.drawHwRect(startSize, startStyle)
    .drawCircle(50, startStyle)
    .restore();
};




