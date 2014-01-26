module.exports = MainGameActivity;

var colors     = require('./maps/colors.js');
var EcsService = require('./services/EcsService.js');
var Style      = require('../lib/renderer/Style.js');

/**
 * @constructor
 * @param {EcsService} ecs
 * @param {Canvas} screen
 */
function MainGameActivity(messanger, navigator, inputs, player, maps, screen, ecs, sound)
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

  messanger.listenTo('finish-start', [], function() {
  }.bind(this));

  this.startTime = 0;
}

MainGameActivity.prototype.onStart = function()
{
  this.maps.loadLevel('level0');
};

MainGameActivity.prototype.onResume = function()
{
  this.paused = false;
};

MainGameActivity.prototype.onPause = function()
{
  this.paused = true;
};

var hudStyle = new Style();
hudStyle.color = 'rgba(255,255,255,0.5)';
hudStyle.font  = '45px Conv_HumanoidStraight';
hudStyle.textAlign = 'left';
MainGameActivity.prototype.drawHud = function()
{
  this.screen
    .save()
    .translate(20, 20)
    .drawText('LEVEL ' + (this.maps.levelNumber + 1), hudStyle)
    .restore()
    .save()
    .translate(this.screen.getSize().x - 75, 20)
    .drawText(this.maps.totalGemCount, hudStyle)
    .restore()

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

  if (this.inputs.button_k_27) {
    this.navigator.finish(this);
  }

  this.ecs.update(dt, time);
  this.drawHud();
  this.drawFade();
};

MainGameActivity.prototype.drawFade = function()
{
  this.screen.save().setAlpha(this.fade).fill('black').restore();
};

