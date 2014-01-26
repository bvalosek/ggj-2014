module.exports = CollisionSystem;

var Position         = require('../components/Position.js');
var Spatial          = require('../components/Spatial.js');
var Vec2             = require('tiny-ecs').Vec2;
var MessangerService = require('../services/MessangerService.js');

/**
 * @constructor
 * @param {MessangerService} messanger
 */
function CollisionSystem(maps, messanger, entities)
{
  this.entities  = entities;
  this.messanger = messanger;
  this.maps      = maps;
}

var FILTER = [Position, Spatial];

CollisionSystem.prototype.update = function(dt, time)
{
  var entities = this.entities.queryComponents(FILTER);
  var player = this.entities.queryTag('player')[0];

  var pSpatial = player.spatial.hwidth;

  // brute force, only check player
  for (var n = 0; n < entities.length; n++) {
    var entity = entities[n];
    if (entity === player) continue;

    var coincident = Vec2.rectIntersect(
      entity.position.location,
      entity.spatial.hwidth,
      player.position.location,
      player.spatial.hwidth);

    if (coincident)
      this.messanger.trigger(player, CollisionSystem.COINCIDENT, entity);
  }

  // if we're hitting a wall
  var m = this.maps;
  var p = player;
  var onMap = Vec2.rectIntersect(
    m.position,
    m.hwidth,
    p.position.location,
    p.spatial.hwidth);

  if (!onMap) {
      // this.messanger.trigger(player, CollisionSystem.COINCIDENT, null);
  }

};

