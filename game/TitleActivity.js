module.exports = TitleActivity;

var EcsService    = require('./boot/EcsService.js');

/**
 * @constructor
 * @param {EcsService} ecs
 * @param {Canvas} screen
 */
function TitleActivity(maps, screen, ecs, sound)
{
  this.paused = true;
  this.screen = screen;
  this.ecs    = ecs;
  this.maps   = maps;
  this.sound  = sound;
}

TitleActivity.prototype.onStart = function()
{
  this.maps.loadLevel('title');
  //this.sound.play('reload1');
};

TitleActivity.prototype.onResume = function()
{
  this.paused = false;
};

TitleActivity.prototype.onPause = function()
{
  this.paused = true;
};

/**
 * @param {Number} dt
 * @param {Number} time
 */
TitleActivity.prototype.update = function(dt, time)
{
  if (this.paused) return;
  this.ecs.update(dt, time);
};

TitleActivity.prototype.drawBg = function()
{
  this.screen
    .save()
    .fill('#333')
    .restore();
};



