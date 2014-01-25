module.exports = MainGameActivity;

var EcsService    = require('./boot/EcsService.js');

/**
 * @constructor
 * @param {EcsService} ecs
 * @param {Canvas} screen
 */
function MainGameActivity(maps, screen, ecs)
{
  this.paused = true;
  this.screen = screen;
  this.ecs    = ecs;
  this.maps   = maps;
}

MainGameActivity.prototype.onStart = function()
{
  this.maps.loadLevel(0);
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
  if (this.paused) return;
  this.ecs.update(dt, time);
};

MainGameActivity.prototype.drawBg = function()
{
  this.screen
    .save()
    .fill('#333')
    .restore();
};



