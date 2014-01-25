module.exports = MapService;

var EntityManager = require('tiny-ecs').EntityManager;


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
}

/**
 * @param {Number} levelNumber
 */
MapService.prototype.loadLevel = function(levelNumber)
{

};

MapService.prototype.clearLevel = function()
{

};





