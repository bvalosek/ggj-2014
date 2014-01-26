module.exports = PlayerService;

var EntityManager = require('tiny-ecs').EntityManager;

var Position    = require('../components/Position.js');
var Spatial     = require('../components/Spatial.js');
var ColorSpirit = require('../components/ColorSpirit.js');
var Avatar      = require('../components/Avatar.js');
var Steering    = require('../components/Steering.js');
var Newtonian   = require('../components/Newtonian.js');

var colors = require('../maps/colors.js');

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

  global.player = player;
  container.register('player', player);
  player.position.location.set(50, 50);

  var playerSize = 15;
  player.spatial.hwidth.set(playerSize, playerSize);
  player.newtonian.maxSpeed = 200;
  player.steering.deceleration = 10;
}



