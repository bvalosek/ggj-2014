module.exports = TitleActivity;

var Vec2              = require('tiny-ecs').Vec2;
var Style             = require('../lib/renderer/Style.js');
var Canvas            = require('../lib/renderer/Canvas.js');
var Color             = require('../lib/renderer/Color.js');
var MainGameActivity  = require('./MainGameActivitiy.js');
var colors            = require('./maps/colors.js');

/**
 * @constructor
 * @param {EcsService} ecs
 * @param {Canvas} screen
 */
function TitleActivity(screen, sound)
{
  this.paused = false;
  this.screen = screen;
  this.sound = sound;

  this.colorArray = [];
  for (var key in colors) {
    if(key != 'black' && key != 'white')
      this.colorArray.push(colors[key])
  }
  this.maxColors = this.colorArray.length;
  this.currentColor = this.colorArray[0];
  this.colorIndex = 1;
}

TitleActivity.prototype.onStart = function()
{

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
  this.drawBg(dt);
  this.drawText();
};

TitleActivity.prototype.drawBg = function(dt)
{
  var nextcolor = this.colorArray[this.colorIndex];
  var scale = 0.05; //* dt;
  var colorDiff = Color.sub(nextcolor, this.currentColor);
  this.currentColor = Color.cap(Color.add(this.currentColor, colorDiff, scale));

  if(Color.equals(this.currentColor, nextcolor) ){
    this.colorIndex++;
    this.colorIndex %= this.maxColors;
  }
  var rgbcolor = 'rgb(' +
    this.currentColor.r.toFixed(0) + ',' +
    this.currentColor.g.toFixed(0) + ',' +
    this.currentColor.b.toFixed(0) + ')';

  this.screen
    .save()
    .fill(rgbcolor)
    .restore();
};

var startPos = new Vec2(screen.width / 2, (screen.height / 2) - 10);

var textStyle = new Style();
textStyle.color = '#fff';
textStyle.font  = '35px sans-serif';
textStyle.textAlign = Style.RIGHT;
textStyle.textBaseline = Style.MIDDLE;

TitleActivity.prototype.drawText = function(entity)
{
  this.screen
    .save()
    .vtranslate(startPos)
    .drawText('Relativity', textStyle)
    .restore();
}


