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

  this.lastGem = null;
  this.collidingGem = false;

  this.messanger.listenTo(
    CollisionSystem.COINCIDENT,
    [Avatar],
    this.onAvatarCollide.bind(this));

  this.messanger.listenTo(
    CollisionSystem.OUT_OF_BOUNDS,
    [Avatar],
    this.onAvatarOutOfBounds.bind(this));
}

var FILTER = [Position, Newtonian];

Physics.prototype.onAvatarOutOfBounds = function(player)
{
  bounceEntity(player);
};



Physics.prototype.onAvatarCollide = function(entity, other)
{
  if (!other || other.hasTag('wall'))
    this.onWall(entity, other);

  if (other.levelObject && other.levelObject.type
    == LevelObject.types.GEM) {
    this.onGem(entity, other);
  }
};

Physics.prototype.onGem = function(avatar, gem)
{
  var wasDisabled = !!gem.colorSpirit.cooldown;

  // reset dat timmy
  gem.colorSpirit.cooldown = 1500;

  this.collidingGem = true;
  if (gem === this.lastGem) return;
  this.lastGem = gem;

  if (wasDisabled) return;
  var avatarColor = avatar.colorSpirit.toColor();
  avatar.colorSpirit.setTarget(gem.colorSpirit.toColor());
  gem.colorSpirit.setTarget(avatarColor);
};

Physics.prototype.onWall = function(avatar, wall)
{
  var aColor = avatar.colorSpirit.toColor();
  var wColor = wall.colorSpirit.toColor();

  if (!Color.equals(aColor, wColor)) {
    bounceEntity(avatar);
  }
};

function bounceEntity(entity)
{
  var v      = Vec2.aquire();
  var aVel   = entity.newtonian.velocity;
  v.assign(aVel).rotate(Math.PI).smult(4.05);
  entity.newtonian.velocity.assign(v);
  entity.steering.heading.set(0, 0);
  Vec2.release(v);
}

Physics.prototype.update = function(dt, time)
{
  var entities = this.entities.queryComponents(FILTER);

  if (!this.collidingGem) {
    this.lastGem = null;
  }

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

  this.collidingGem = false;
};



