module.exports = SoundService;

var EntityManager = require('tiny-ecs').EntityManager;
var play          = require('play-audio');
var Position      = require('../components/Position.js');

var soundbank = {
  reload1: 'reload1.mp3',
  reload2: 'reload2.mp3',
  bit: '8bit theme.mp3',
  dark: 'Dark Ambient Theme.mp3',
  synth: 'heavy synth theme.mp3'

}

var _loadedSounds = {};
/**
 * @constructor
 * @param {EntityManager} entities
 */
function SoundService(container, debug)
{
  this.debug = debug;
  container.register('sound', this);
}

SoundService.prototype.play = function(sound)
{
  if(!_loadedSounds[sound]){
    _loadedSounds[sound] = play('sound/' + soundbank[sound]);
  }
  _loadedSounds[sound].load('sound/' + soundbank[sound]).play();

  this.debug._loadedSounds = _loadedSounds;
};

SoundService.prototype.pause = function(sound)
{
  _loadedSounds[sound].load('sound/' + soundbank[sound]).pause();
}

SoundService.prototype.doneLoading = function(){
  return Object.keys(_loadedSounds).length == Object.keys(soundbank).length;
}





