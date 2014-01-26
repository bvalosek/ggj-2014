module.exports = LevelSystem;

var Position         = require('../components/Position.js');
var Spatial          = require('../components/Spatial.js');
var Vec2             = require('tiny-ecs').Vec2;
var MessangerService = require('../services/MessangerService.js');
var Finish           = require('../components/Finish.js');

/**
 * @constructor
 * @param {MessangerService} messanger
 */
function LevelSystem(maps, entities, messanger)
{
  this.entities  = entities;
  this.messanger = messanger;
  this.maps      = maps;

  this.currentLevel = 0;

  this.messanger.listenTo(
    LevelSystem.FINISH_LEVEL, [], this.onFinishLevel.bind(this));
}

var dist = new Vec2();
LevelSystem.prototype.onFinishLevel = function(player, fEntity)
{
  var finish = fEntity.finish;

  dist.assign(fEntity.position.location).sub(player.position.location);

  // constrain movement
  player.newtonian.acceleration
    .assign(dist)
    .smult(100);

  // constrain speed
  player.newtonian.velocity
    .normalize(dist.magnitude()*5);


  if (!finish.timeOut && !finish.finished) {
    finish.timeOut = 1500;
    this.messanger.trigger(fEntity, 'finish-start');
  }

  if (finish.finished) {
    this.currentLevel++;
    this.loadLevel();
  }

};

LevelSystem.prototype.loadLevel = function()
{
  this.entities.queryTag('player')[0].position.rotation = 0;

  var key = 'level' + this.currentLevel;
  this.maps.loadLevel(key);
};

var FILTER = [Finish];

LevelSystem.prototype.update = function(dt, time)
{
  var finishes = this.entities.queryComponents(FILTER);

  for (var n = 0; n < finishes.length; n++) {
    var fEntity = finishes[n];
    var finish = fEntity.finish;

    if (finish.timeOut) {
      finish.timeOut = Math.max(0, finish.timeOut - dt);
      if (!finish.timeOut)
        finish.finished = true;
    }
  }
};

LevelSystem.FINISH_LEVEL = 'level#finish';

