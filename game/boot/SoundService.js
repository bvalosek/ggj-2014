module.exports = SoundService;

var EntityManager = require('tiny-ecs').EntityManager;
var play          = require('play-audio');
var Position      = require('../components/Position.js');

var soundbank = {
  reload1: 'reload1.mp3',
  reload2: 'reload2.mp3'
}

var _loadedSounds = {};
/**
 * @constructor
 * @param {EntityManager} entities
 */
function SoundService(container, entities, debug)
{
  this.entities = entities;
  this.debug = debug;
  container.register('sound', this);
}

SoundService.prototype.play = function(sound)
{
  if(!_loadedSounds[sound]){
    _loadedSounds[sound] = play('sound/' + soundbank[sound]);
  }
  //_loadedSounds[sound].autoplay();
  play('sound/' + soundbank[sound]).play();

  this.debug._loadedSounds = _loadedSounds;
};






