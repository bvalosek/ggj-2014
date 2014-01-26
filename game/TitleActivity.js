module.exports = TitleActivity;

var Vec2              = require('tiny-ecs').Vec2;
var Style             = require('../lib/renderer/Style.js');
var Canvas            = require('../lib/renderer/Canvas.js');
var Color             = require('../lib/renderer/Color.js');
var MainGameActivity  = require('./MainGameActivitiy.js');
var colors            = require('./maps/colors.js');

startingKeysPressed = 0;
/**
 * @constructor
 * @param {EcsService} ecs
 * @param {Canvas} screen
 */
function TitleActivity(debug, navigator, screen, sound, inputs)
{
  this.navigator = navigator;
  this.screen = screen;
  this.sound = sound;
  this.inputs = inputs;
  this.paused = false;
  this.debug = debug;

  this.colorArray = [];
  for (var key in colors) {
    if(key != 'black' && key != 'white' && key != 'gray')
      this.colorArray.push(colors[key])
  }
  this.maxColors = this.colorArray.length;
  this.currentColor = colors.black;
  this.colorIndex = 1;
  this.blackTime = 5000;
  startingKeysPressed = this.inputs.keysPressed;
}

TitleActivity.prototype.onStart = function()
{
  if (this.debug.dev)
    this.navigator.start(MainGameActivity);
};

TitleActivity.prototype.onResume = function()
{
  this.paused = false;
  startingKeysPressed = this.inputs.keysPressed;
  this.sound.play('synth');
};

TitleActivity.prototype.onPause = function()
{
  this.paused = true;

  this.sound.pause('synth');
};

/**
 * @param {Number} dt
 * @param {Number} time
 */
TitleActivity.prototype.update = function(dt, time)
{
  if (this.paused) return;

  if (this.inputs.keysPressed > startingKeysPressed){
    this.inputs.button_k_27 = 0; //HACKS
    this.navigator.start(MainGameActivity);
  }
  this.drawBg(dt);
  this.drawText();
  this.drawAbout();
};

var boxStyle = new Style()
boxStyle.color = '#333';

TitleActivity.prototype.drawBg = function(dt)
{
  this.blackTime -= dt;
  var nextcolor = this.colorArray[this.colorIndex];
  var scale = 0.05; //* dt;
  if(this.blackTime > 0) scale = 0.005;
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

  //draw bottom box
  this.screen
    .save()
    .translate(screenSize.x / 2, screenSize.y - screenSize.y / 5)
    .drawHwRect(boxSize, boxStyle)
    .restore();


};

var textStyle = new Style();
textStyle.color = '#fff';
textStyle.font  = '150px Conv_HumanoidStraight';
textStyle.textAlign = 'right';
textStyle.textBaseline = Style.MIDDLE;
var title = 'Relativity';
var KARRAY = [0, 80, 50, 90, 60, 60, 90, 50, 80, 80];
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

var aboutText = new Style();
aboutText.color = '#fff';
aboutText.font  = '50px Conv_ArcadeClassic';
aboutText.textAlign = 'left';

var inc = new Style();
inc.color = '#fff';
inc.font  = '25px Conv_ArcadeClassic';
inc.textAlign = 'right';
TitleActivity.prototype.drawAbout = function(entity)
{
  var screenSize = this.screen.getSize();

  //draw left
  this.screen
    .save()
    .translate(25, screenSize.y - screenSize.y / 4)
    .drawText("We  don't  see  things  as  they  are,  we  see  them  as  we  are", aboutText)
    .restore();

  //draw right
  this.screen
    .save()
    .translate(screenSize.x - 25, screenSize.y - screenSize.y / 6)
    .drawText("A  Sapphire  on  Sails  Studios  Production", inc) 
    .restore();

}
