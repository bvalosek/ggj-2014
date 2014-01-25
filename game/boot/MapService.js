module.exports = MapService;

var EntityManager = require('tiny-ecs').EntityManager;
var Position      = require('../components/Position.js');
var Spatial       = require('../components/Spatial.js');
var ColorSpirit   = require('../components/ColorSpirit.js');
var LevelObject   = require('../components/LevelObject.js');

var LEVELS = [
  require('../maps/nicklevel-1.js'),
  require('../maps/level-2.js'),
  require('../maps/level-3.js')
];

/**
 * @constructor
 * @param {EntityManager} entities
 */
function MapService(container, entities)
{
  this.entities = entities;
  container.register('maps', this);
}

/**
 * @param {Number} levelNumber
 */
MapService.prototype.loadLevel = function(levelNumber)
{
  var level = LEVELS[levelNumber];

  //whaaals
  for (var i = 0; i < level.walls.length; i++) {
    var wall = level.walls[i];

    var entity =
    this.entities.createEntity()
      .addComponent(Position)
      .addComponent(Spatial)
      .addComponent(ColorSpirit)
      .addTag('world');

    entity.position.location.x = wall.position.x;
    entity.position.location.y = wall.position.y;

    entity.spatial.hwidth.x = wall.spatial.x;
    entity.spatial.hwidth.y = wall.spatial.y;

    entity.colorSpirit.set(
      wall.color.r,
      wall.color.g,
      wall.color.b);
  }

  //geems
  for (var g = 0; g < level.gems.length; g++) {
    var gem = level.gems[g];

    var entity =
    this.entities.createEntity()
      .addComponent(Position)
      .addComponent(Spatial)
      .addComponent(ColorSpirit)
      .addComponent(LevelObject)
      .addTag('gem');

    entity.position.location.x = gem.position.x;
    entity.position.location.y = gem.position.y;

    entity.spatial.hwidth.set(20,20);

    entity.colorSpirit.set(
      gem.color.r,
      gem.color.g,
      gem.color.b);

    entity.levelObject.type = LevelObject.types.GEM;

    //world OBJS
    var playerStart = this.entities.createEntity()
        .addComponent(Position)
        .addComponent(LevelObject)
        .addTag('world');

    playerStart.position.location.x = level.levelObjects.playerStart.x;
    playerStart.position.location.y = level.levelObjects.playerStart.y;
    playerStart.levelObject.type = LevelObject.types.PLAYER_START;

    var levelFinish = this.entities.createEntity()
        .addComponent(Position)
        .addComponent(LevelObject)
        .addTag('world');

    levelFinish.position.location.x = level.levelObjects.levelFinish.x;
    levelFinish.position.location.y = level.levelObjects.levelFinish.y;
    levelFinish.levelObject.type = LevelObject.types.LEVEL_FINISH;
  }
};

MapService.prototype.clearLevel = function()
{
  var world = this.entities.queryTag('world');

  for (var i = 0; i < world.length; i++) {
    this.entities.removeEntity( world[i]);
  }
};





