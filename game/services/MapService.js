module.exports = MapService;

var EntityManager = require('tiny-ecs').EntityManager;
var Position      = require('../components/Position.js');
var Spatial       = require('../components/Spatial.js');
var ColorSpirit   = require('../components/ColorSpirit.js');
var LevelObject   = require('../components/LevelObject.js');
var Avatar        = require('../components/Avatar.js');
var Text          = require('../components/Text.js');
var Finish        = require('../components/Finish.js');
var Vec2          = require('tiny-ecs').Vec2;

var LEVELS = require('../maps/levels.js');

/**
 * @constructor
 * @param {EntityManager} entities
 */
function MapService(container, entities)
{
  this.entities = entities;
  container.register('maps', this);
  this.size = new Vec2();
  this.position = new Vec2();
  this.hwidth = new Vec2();

  this.totalGemCount = 0;

  this.levelKey = '';

  global.loadLevel = this.loadLevel.bind(this);
}

/**
 * @param {Number} levelNumber
 */
MapService.prototype.loadLevel = function(levelName)
{
  this.levelKey = levelName;
  this.levelNumber = 0|levelName.match(/\d+/)[0];
  var level = LEVELS[levelName];

  this.clearLevel();

  var player = this.entities.queryTag('player')[0];

  // dat dimensh
  this.size.assign(level.size);
  this.position.assign(this.size).smult(0.5);
  this.hwidth.assign(this.position);

  // dat colo tho
  player.colorSpirit.setBoth(level.startColor);

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

    entity.colorSpirit.setBoth(
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

    entity.spatial.hwidth.set(8,8);

    entity.colorSpirit.setBoth(
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

  //set player start
  var AVATAR_FILTER = [Position, Spatial, Avatar, ColorSpirit];
  var avatars = this.entities.queryComponents(AVATAR_FILTER);
  for (var a = 0; a < avatars.length; a++) {
    avatars[a].position.location.set(playerStart.position.location.x, playerStart.position.location.y);
    avatars[a].colorSpirit.setBoth(level.startColor);
  };

  var levelFinish = this.entities.createEntity()
      .addComponent(Position)
      .addComponent(Spatial)
      .addComponent(LevelObject)
      .addComponent(Finish)
      .addTag('world');

  levelFinish.position.location.x = level.levelObjects.levelFinish.x;
  levelFinish.position.location.y = level.levelObjects.levelFinish.y;
  levelFinish.spatial.hwidth.x = 50;
  levelFinish.spatial.hwidth.y = 50;

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





