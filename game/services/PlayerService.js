module.exports = PlayerService;

var EntityManager = require('tiny-ecs').EntityManager;

var Position    = require('../components/Position.js');
var Spatial     = require('../components/Spatial.js');
var ColorSpirit = require('../components/ColorSpirit.js');
var Avatar      = require('../components/Avatar.js');
var Steering    = require('../components/Steering.js');
var Newtonian   = require('../components/Newtonian.js');

/**
 * @constructor
 * @param {EntityManager} entities
 */
function PlayerService(entities, container)
{
  var player = entities.createEntity()
    .addComponent(Position)
    .addComponent(Spatial)
    .addComponent(ColorSpirit)
    .addComponent(Avatar)
    .addComponent(Steering)
    .addComponent(Newtonian)
    .addTag('player');

  player.position.location.set(250, 250);
  player.spatial.hwidth.set(50, 50);
  player.colorSpirit.set(125,125,125);

  global.player = player;

  container.register('player', player);
}



