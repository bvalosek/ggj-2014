module.exports = MainGameActivity;

var colors     = require('./maps/colors.js');
var EcsService = require('./services/EcsService.js');

/**
 * @constructor
 * @param {EcsService} ecs
 * @param {Canvas} screen
 */
function MainGameActivity(navigator, inputs, player, maps, screen, ecs, sound)
{
  this.paused    = true;
  this.screen    = screen;
  this.ecs       = ecs;
  this.maps      = maps;
  this.sound     = sound;
  this.player    = player;
  this.inputs    = inputs;
  this.navigator = navigator;

  this.fade = 1;

  this.startTime = 0;
}

MainGameActivity.prototype.onStart = function()
{
  this.maps.loadLevel('level4');
  this.player.colorSpirit.set(colors.green);
};

MainGameActivity.prototype.onResume = function()
{
  this.paused = false;
};

MainGameActivity.prototype.onPause = function()
{
  this.paused = true;
};

/**
 * @param {Number} dt
 * @param {Number} time
 */
MainGameActivity.prototype.update = function(dt, time)
{
  this.startTime = this.startTime || time;
  var fade = Math.max(0, 1 - (time - this.startTime) / 1000);
  this.fade = this.fade * 0.9 + fade * 0.1;

  if (this.inputs.button_k_27) {
    this.navigator.finish(this);
  }

  if(this.inputs.button_k_49)
    this.player.colorSpirit.set(colors.red);
  if(this.inputs.button_k_50)
    this.player.colorSpirit.set(colors.yellow);
  if(this.inputs.button_k_51)
    this.player.colorSpirit.set(colors.green);
  if(this.inputs.button_k_52)
    this.player.colorSpirit.set(colors.blue);
  if(this.inputs.button_k_53)
    this.player.colorSpirit.set(colors.purple);
  if(this.inputs.button_k_54)
    this.player.colorSpirit.set(colors.gray);

  if (this.paused) return;

  this.drawBg();
  this.ecs.update(dt, time);
  this.drawFade();
};

MainGameActivity.prototype.drawFade = function()
{
  this.screen.save().setAlpha(this.fade).fill('black').restore();
};

MainGameActivity.prototype.drawBg = function()
{
  this.screen
    .save()
    .fill(this.player.colorSpirit.style.color)
    .restore();
};



