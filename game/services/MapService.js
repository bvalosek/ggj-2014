module.exports = MapService;

var EntityManager = require('tiny-ecs').EntityManager;
var Position      = require('../components/Position.js');
var Spatial       = require('../components/Spatial.js');
var ColorSpirit   = require('../components/ColorSpirit.js');
var LevelObject   = require('../components/LevelObject.js');
var Text          = require('../components/Text.js');

var LEVELS = require('../maps/levels.js');

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
MapService.prototype.loadLevel = function(levelName)
{
  var level = LEVELS[levelName];

  //whaaals
  for (var i = 0; i < level.walls.length; i++) {
    var wall = level.walls[i];

    var entity =
    this.entities.createEntity()
      .addComponent(Position)
      .addComponent(Spatial)
      .addComponent(ColorSpirit)
      .addTag('world')
      .addTag('wall');

    entity.position.location.x = wall.position.x;
    entity.position.location.y = wall.position.y;

    entity.spatial.hwidth.x = wall.spatial.x;
    entity.spatial.hwidth.y = wall.spatial.y;

    if (wall.text) addText(entity, wall.text);

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
      .addTag('gem')
      .addTag('world');

    entity.position.location.x = gem.position.x;
    entity.position.location.y = gem.position.y;

    entity.spatial.hwidth.set(20,20);

    entity.colorSpirit.set(
      gem.color.r,
      gem.color.g,
      gem.color.b);

    if (gem.text) addText(entity, gem.text);

    entity.levelObject.type = LevelObject.types.GEM;

  }

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
};

function addText(entity, text)
{
  entity.addComponent(Text);
  entity.text.value = text;
};

MapService.prototype.clearLevel = function()
{
  this.entities.removeEntitiesByTag('world');
};





