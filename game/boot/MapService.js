module.exports = MapService;

var EntityManager = require('tiny-ecs').EntityManager;
var Position      = require('../components/Position.js');
var Spatial       = require('../components/Spatial.js');
var ColorSpirit   = require('../components/ColorSpirit.js');

var LEVELS = [
  require('../maps/level-1.js')
];

/**
 * @constructor
 * @param {EntityManager} entities
 */
function MapService(debug, entities)
{
  this.entities = entities;
  this.debug = debug;
  this.loadLevel(0);
}

/**
 * @param {Number} levelNumber
 */
MapService.prototype.loadLevel = function(levelNumber)
{
  var level = LEVELS[levelNumber];

  this.debug.worldobjs = [];
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

    this.debug.worldobjs.push(entity);
  }

};

MapService.prototype.clearLevel = function()
{
  var world = this.entities.queryTag('world');

  for (var i = 0; i < world.length; i++) {
    this.entities.removeEntity( world[i]);
  }
};





