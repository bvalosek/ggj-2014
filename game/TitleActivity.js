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
function TitleActivity(navigator, screen, sound, inputs)
{
  this.navigator = navigator;
  this.screen = screen;
  this.sound = sound;
  this.inputs = inputs;
  this.paused = false;

  this.colorArray = [];
  for (var key in colors) {
    if(key != 'black' && key != 'white' && key != 'gray')
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

  if (this.inputs.button_k_87){
    this.navigator.start(MainGameActivity);
  }
  this.drawBg(dt);
  this.drawText();
};

var boxStyle = new Style()
boxStyle.color = '#333';

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
  var htmlColor = Color.tohtml(this.currentColor);

  var screenSize = this.screen.getSize();
  var boxSize = new Vec2(screenSize.x / 2, screenSize.y / 5);

 this.screen
    .save()
    .fill(htmlColor)
    .restore();

  this.screen
    .save()
    .translate(screenSize.x / 2, screenSize.y - screenSize.y / 5)
    .drawHwRect(boxSize, boxStyle)
    .restore();
};

var textStyle = new Style();
textStyle.color = '#fff';
textStyle.font  = '75px Conv_HumanoidStraight';
textStyle.textAlign = 'right';
textStyle.textBaseline = Style.MIDDLE;
var title = 'Relativity';
var KARRAY = [0, 40, 25, 45, 30, 30, 45, 25, 40, 40];
//var KERN = new Vec2(35, 0);

TitleActivity.prototype.drawText = function(entity)
{
  var width = this.screen.getSize().x;

  this.screen
    .save()
    .translate(width/4, 100);
  
  for (var i = 0; i < title.length; i++) {
    textStyle.color = Color.tohtml(this.colorArray[ i % this.maxColors ] );
    this.screen
      .translate(KARRAY[i], 0)
      .drawText(title[i], textStyle)
  };

  this.screen.restore();
}


