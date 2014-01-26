module.exports = Physics;

var EntityManager    = require('tiny-ecs').EntityManager;
var Vec2             = require('tiny-ecs').Vec2;
var Position         = require('../components/Position.js');
var Newtonian        = require('../components/Newtonian.js');
var MessangerService = require('../services/MessangerService.js');
var CollisionSystem  = require('./CollisionSystem.js');
var Avatar           = require('../components/Avatar.js');
var Color            = require('../../lib/renderer/Color.js');
var LevelObject      = require('../components/LevelObject.js');

/**
 * Evolve position w/ velocity.
 * @constructor
 * @param {EntityManager} entities
 * @param {MessangerService} messanger
 */
function Physics(messanger, entities)
{
  this.entities = entities;
  this.messanger = messanger;

  this.messanger.listenTo(
    CollisionSystem.COINCIDENT,
    [Avatar],
    this.onAvatarCollide.bind(this));
}

var FILTER = [Position, Newtonian];

Physics.prototype.onAvatarCollide = function(entity, other)
{
  if (other.hasTag('wall'))
    this.onWall(entity, other);

  if (other.levelObject && other.levelObject.type
    == LevelObject.types.GEM) {
    this.onGem(entity, other);
  }
};

Physics.prototype.onGem = function(avatar, gem)
{
  var avatarColor = avatar.colorSpirit.toColor();
  avatar.colorSpirit.setTarget(gem.colorSpirit.toColor());
  gem.colorSpirit.setTarget(avatarColor);
};

Physics.prototype.onWall = function(avatar, wall)
{
  var v      = Vec2.aquire();
  var aVel   = avatar.newtonian.velocity;
  var aColor = avatar.colorSpirit.toColor();
  var wColor = wall.colorSpirit.toColor();

  if (!Color.equals(aColor, wColor)) {
    v.set(2,2).assign(aVel).rotate(Math.PI).smult(4.05);
    avatar.newtonian.velocity.assign(v);
    avatar.steering.heading.set(0, 0);
  }
  Vec2.release(v);
};

Physics.prototype.update = function(dt, time)
{
  var entities = this.entities.queryComponents(FILTER);

  var t = dt/1000;

  for (var n = 0; n < entities.length; n++) {
    var entity = entities[n];
    var v      = entity.newtonian.velocity;
    var maxV   = entity.newtonian.maxSpeed;
    var a      = entity.newtonian.acceleration;
    var pos    = entity.position.location;

    v.x += a.x * t;
    v.y += a.y * t;

    pos.x += v.x * t;
    pos.y += v.y * t;

    v.limit(maxV);
  }
};



