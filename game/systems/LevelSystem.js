module.exports = LevelSystem;

var Position         = require('../components/Position.js');
var Spatial          = require('../components/Spatial.js');
var Vec2             = require('tiny-ecs').Vec2;
var MessangerService = require('../services/MessangerService.js');

/**
 * @constructor
 * @param {MessangerService} messanger
 */
function LevelSystem(entities, messanger)
{
  this.entities  = entities;
  this.messanger = messanger;
}



