module.exports = SoundService;

var EntityManager    = require('tiny-ecs').EntityManager;
var Position         = require('../components/Position.js');
var colors           = require('../maps/colors.js');
var Color            = require('../../lib/renderer/Color.js');
var CollisionSystem  = require('../systems/CollisionSystem.js');
var LevelSystem      = require('../systems/LevelSystem.js');
var Avatar           = require('../components/Avatar.js');
var LevelObject      = require('../components/LevelObject.js');

var soundbank = {
  reload1: 'reload1.mp3',
  reload2: 'reload2.mp3',
  bit: '8bit theme.mp3',
  dark: 'Dark Ambient Theme.mp3',
  synth: 'heavy synth theme.mp3',
  wallbump: 'wallbump.mp3',
  blue_spirit: 'bloo_spirit.mp3',
  green_spirit: 'green_spirit.mp3',
  purple_spirit: 'purple_spirit.mp3',
  red_spirit: 'red_spirit.mp3',
  yellow_spirit: 'yellow_spirit.mp3',
  level_complete: 'level complete.mp3',
  bg1:      'level theme 1.mp3',
  bg2:      'level theme 2.mp3',
  bg3:      'level theme 3.mp3'
};

var bgorder = [
  'bg1',
  'bg2',
  'bg3'
];

var _loadedSounds = {};
/**
 * @constructor
 * @param {EntityManager} entities
 */
function SoundService(container, debug, messanger)
{
  this._loadedSoundsCount = 0;
  this.debug = debug;
  this.messanger = messanger;
  this.path = 'sound/';
  container.register('sound', this);
  this.bgindex = null;

  //load all sounds
  for (var sound in soundbank) {
    this.load(sound);
  }

  this.messanger.listenTo(
    CollisionSystem.COINCIDENT,
    [Avatar],
    this.onAvatarCollide.bind(this));

  this.messanger.listenTo(
    CollisionSystem.WALL,
    [Avatar],
    this.onWallCollide.bind(this));

  this.messanger.listenTo(
    LevelSystem.LOAD_LEVEL, 
    [],
    this.onLoadLevel.bind(this));

  this.messanger.listenTo(
    LevelSystem.FINISH_LEVEL, 
    [],
    this.onFinishLevel.bind(this));

  this.debug.sounds = [];
}

SoundService.prototype.load = function(sound){
  if(!_loadedSounds[sound]){
    _loadedSounds[sound] = new Audio(this.path + sound); //document.createElement("audio");
    //_loadedSounds[sound].id = sound;
    //_loadedSounds[sound].src = this.path + soundbank[sound];
    _loadedSounds[sound].autoload = 'auto';
    _loadedSounds[sound].loop = 'true';
    _loadedSounds[sound].oncanplaythrough = this.playthrough.bind(this);
    _loadedSounds[sound].ended = this.onended;
    //document.body.appendChild(_loadedSounds[sound]);
  }
  this.debug._loadedSounds = _loadedSounds;
}
SoundService.prototype.playthrough = function(sound){
  this._loadedSoundsCount++;
}
SoundService.prototype.onended = function(){
  this.currentTime = 0;
}

var playing={};

SoundService.prototype.play = function(sound, endcallback)
{
  var a,b;
  b=new Date();
  a=sound+b.getTime();
  playing[a] = new Audio(this.path + soundbank[sound]);
  // with this we prevent playing-object from becoming a memory-monster:
  playing[a].onended=function(){
    if(endcallback){ endcallback(playing[a]); }
    delete playing[a];
   };
  playing[a].play();

  // if(this.doneLoading()){
  //   //_loadedSounds[sound].pause();
  //   //this.load(sound);
  //   //document.getElementById(sound).currentTime = 0;
  //   _loadedSounds[sound].currentTime = 0;
  //   _loadedSounds[sound].play();
  // }
};


SoundService.prototype.playMusic = function()
{
  if(this.bgindex === null){
    this.bgindex = 0;
  }else{
    this.bgindex = (this.bgindex + 1) % bgorder.length;
  }
  
  var song = bgorder[this.bgindex];
  endcallback = function(sound){console.log(sound)};

  this.play(song, endcallback);
}

SoundService.prototype.pauseMusic = function(){
  var song = bgorder[this.bgindex];
  this.pause(song);
}

SoundService.prototype.pause = function(sound)
{
  for (var soundKey in playing) {
    if(soundKey.indexOf(sound) !== -1){
        playing[soundKey].pause();
        //pausing is for losers
        delete playing[soundKey];
      }
  }
}

SoundService.prototype.doneLoading = function(){
  return this._loadedSoundsCount === Object.keys(soundbank).length;
}

SoundService.prototype.onAvatarCollide = function(entity, other)
{
  if (other.levelObject && other.levelObject.type == LevelObject.types.GEM) {
    var targetColor = other.colorSpirit.target;
    
    //this.playerColor = entity.colorSpirit.target;

    if (targetColor === this.lastEntity || targetColor === this.lastOther) return;
    this.lastEntity = entity.colorSpirit.target;
    this.lastOther = other.colorSpirit.target;

    if(Color.equals(targetColor, colors.red))
      this.play('red_spirit');
    if(Color.equals(targetColor, colors.yellow))
      this.play('yellow_spirit');
    if(Color.equals(targetColor, colors.green))      
      this.play('green_spirit');
    if(Color.equals(targetColor, colors.blue))
      this.play('blue_spirit');
    if(Color.equals(targetColor, colors.purple))
      this.play('purple_spirit');
    
  }
};

SoundService.prototype.onWallCollide = function(entity, other)
{
  if (other.hasTag('wall'))
    this.play('wallbump');
};

var alreadyFinishing = false;
SoundService.prototype.onFinishLevel = function()
{
  if(!alreadyFinishing){
    this.pauseMusic();
    this.play('level_complete',
      function(sound){
        alreadyFinishing = false;
      } 
    );
    alreadyFinishing = true;
  }
};

SoundService.prototype.onLoadLevel = function()
{
  this.playMusic();
};



