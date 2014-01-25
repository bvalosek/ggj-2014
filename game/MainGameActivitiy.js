module.exports = MainGameActivity;

var EcsService    = require('./boot/EcsService.js');

/**
 * @constructor
 * @param {EcsService} ecs
 * @param {Canvas} screen
 */
function MainGameActivity(screen, ecs)
{
  this.paused = true;
  this.screen = screen;
  this.ecs    = ecs;
}

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
  this.drawBg();
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



