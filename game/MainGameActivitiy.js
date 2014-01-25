module.exports = MainGameActivity;

var colors     = require('./maps/colors.js');
var EcsService = require('./services/EcsService.js');

/**
 * @constructor
 * @param {EcsService} ecs
 * @param {Canvas} screen
 */
function MainGameActivity(maps, screen, ecs, sound)
{
  this.paused = true;
  this.screen = screen;
  this.ecs    = ecs;
  this.maps   = maps;
  this.sound  = sound;

  this.fade = 1;

  this.startTime = 0;
}

MainGameActivity.prototype.onStart = function()
{
  this.maps.loadLevel('nicklevel');
  //this.sound.play('reload1');
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
    .fill('#333')
    .restore();
};



