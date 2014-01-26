module.exports = SoundService;

var EntityManager    = require('tiny-ecs').EntityManager;
var Position         = require('../components/Position.js');
var colors           = require('../maps/colors.js');
var Color            = require('../../lib/renderer/Color.js');
var CollisionSystem  = require('../systems/CollisionSystem.js');
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
  yellow_spirit: 'yellow_spirit.mp3'
}

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

  //load all sounds
  for (var sound in soundbank) {
    this.load(sound);
  }

  this.messanger.listenTo(
    CollisionSystem.COINCIDENT,
    [Avatar],
    this.onAvatarCollide.bind(this));

  this.debug.sounds = [];
}

SoundService.prototype.load = function(sound){
  if(!_loadedSounds[sound]){
    _loadedSounds[sound] = document.createElement("audio");
    _loadedSounds[sound].src = this.path + soundbank[sound];
    _loadedSounds[sound].autoload = 'auto';
    _loadedSounds[sound].loop = 'true';
    _loadedSounds[sound].oncanplaythrough = this.playthrough.bind(this);
  }
  this.debug._loadedSounds = _loadedSounds;
}
SoundService.prototype.playthrough = function(sound){
  this._loadedSoundsCount++;
}

SoundService.prototype.play = function(sound)
{
  if(this.doneLoading()){
    _loadedSounds[sound].currentTime = 0;
    //_loadedSounds[sound].setAttribute('src', this.path + soundbank[sound])
    _loadedSounds[sound]
      .play();
  }
};

SoundService.prototype.pause = function(sound)
{
  _loadedSounds[sound]
    .pause();
}

SoundService.prototype.doneLoading = function(){
  return this._loadedSoundsCount === Object.keys(soundbank).length;
}

SoundService.prototype.onAvatarCollide = function(entity, other)
{
  if (other.hasTag('wall'))
    this.play('wallbump');

  if (other.levelObject && other.levelObject.type == LevelObject.types.GEM) {
    var targetColor = other.colorSpirit.target;

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





