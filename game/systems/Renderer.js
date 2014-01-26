module.exports = Renderer;

var EntityManager   = require('tiny-ecs').EntityManager;
var Vec2            = require('tiny-ecs').Vec2;
var Style           = require('../../lib/renderer/Style.js');
var Canvas          = require('../../lib/renderer/Canvas.js');
var Position        = require('../components/Position.js');
var Spatial         = require('../components/Spatial.js');
var LevelObject     = require('../components/LevelObject.js');
var ColorSpirit     = require('../components/ColorSpirit.js');
var Finish          = require('../components/Finish.js');
var Color           = require('../../lib/renderer/Color.js');
var Avatar          = require('../components/Avatar.js');
var Text            = require('../components/Text.js');
var colors          = require('../maps/colors.js');
var CollisionSystem = require('./CollisionSystem.js');

/**
 * @constructor
 * @param {EntityManager} entities
 * @param {Canvas} screen
 */
function Renderer(messanger, screen, entities, maps, inputs)
{
  this.screen     = screen;
  this.entities   = entities;
  this.maps       = maps;
  this.inputs     = inputs;
  global.renderer = this;

  this.fade = 0;

  messanger.listenTo(CollisionSystem.WALL, [], this.onShake.bind(this));
  messanger.listenTo('shake', [], this.onShake.bind(this));
}

var COLOR_FILTER = [Position, Spatial, ColorSpirit];
var LEVEL_FILTER = [Position, LevelObject];
var FINISH_FILTER = [Finish];
var TEXT_FILTER = [Position, Text];

// All avatars have to have a color spirit
var AVATAR_FILTER = [Position, Spatial, Avatar, ColorSpirit];

/**
 * @param {Number} dt
 * @param {Number} time
 */
Renderer.prototype.update = function(dt, time)
{
  if (this.isFinishing())
    this.fade = Math.min(1, this.fade + (dt/1000));
  else
    this.fade = Math.max(0, this.fade - (dt/1000));

  global.renderer = this;

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
  this.drawFade();
};

Renderer.prototype.drawFade = function()
{
  this.screen
    .save()
    .setAlpha(this.fade)
    .fill('black')
    .restore();
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

Renderer.prototype.isFinishing = function()
{
  return !!this.entities.queryComponents(FINISH_FILTER)[0].finish.timeOut;
};

var ct = new Vec2();
Renderer.prototype.cameraTransform = function()
{
  var player = this.entities.queryTag('player')[0];
  var inputs = this.inputs;
  var plusKey = inputs.button_k_107 || inputs.button_k_43 || inputs.button_k_187;
  var minusKey = inputs.button_k_109 || inputs.button_k_45 || inputs.button_k_189;

  // cacl zoom
  var zoom = this.zoom || 1;
  var per = player.newtonian.velocity.magnitude() / player.newtonian.maxSpeed;

  if(this.isFinishing())
    zoom = Math.min(20, Math.pow(zoom, 1.15));
  else
    zoom = 1 - this.fade/3;

  // do zoom
  if(per > 0.001){
    var p = 0.995;
    var newZoom = 1.2 - 0.2 * per;
    zoom = zoom * p + (1-p) * newZoom;
  }
  if(plusKey){
    zoom += (zoom+0.01 > 1) ? 0 : 0.01;
  }
  if(minusKey){
    zoom -= (zoom-0.01 < 0.15) ? 0 : 0.01;
  }
  this.screen.scale(zoom, zoom);
  this.zoom = zoom;

  // Translate to account for player
  ct.assign(this.screen.getSize()).smult(0.5 * (1/zoom));
  this.screen.vtranslate(ct);
  ct.assign(player.position.location).smult(-1);
  this.screen.vtranslate(ct);

  var shake = this.shake;

  this.screen.translate(
    Math.random()*shake - shake/2,
    Math.random()*shake - shake/2
  );

  this.shake = this.shake * 0.7;

};

Renderer.prototype.onShake = function()
{
  this.shake = 40;
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

  var player = this.entities.queryTag('player')[0];

  var alpha = Color.equals(
    entity.colorSpirit.toColor(),
    player.colorSpirit.toColor()) ? 0.1 : 1;

  if (disabled) {
    wiggle = wiggle*0.5 + -5 + 5 * (1 - entity.colorSpirit.cooldown/1500);
  }

  var style = disabled ? disabledGemStyle : entity.colorSpirit.style;

  this.screen
    .save()
    .vtranslate(entity.position.location)
    .setAlpha(alpha)
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

    if (entity.levelObject.type === LevelObject.types.LEVEL_FINISH)
      this.drawFinish(entity, dt, time);
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
startStyle.stroke = Color.tohtml(colors.green);
startStyle.strokeWidth = 5;
Renderer.prototype.drawFinish = function(entity, dt, time)
{
  this.screen
    .save()
    .vtranslate(entity.position.location)
    .drawCircle(entity.spatial.hwidth.x, startStyle)
    .restore();
};




