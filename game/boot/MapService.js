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
              .addTag('world')
              ;

        entity.position.x = wall.position.x;
        entity.position.y = wall.position.y;

        entity.spatial.x = wall.spatial.x;
        entity.spatial.y = wall.spatial.y;

        entity.colorSpirit.red = wall.colorSpirit.red;
        entity.colorSpirit.green = wall.colorSpirit.green;
        entity.colorSpirit.blue = wall.colorSpirit.blue;

        this.debug.worldobjs.push(entity);
    };


};

MapService.prototype.clearLevel = function()
{
    var world = this.entities.queryTag('world');

    for (var i = 0; i < world.length; i++) {
        this.entities.removeEntity( world[i]);
    };
};





