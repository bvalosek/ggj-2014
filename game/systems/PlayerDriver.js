module.exports = PlayerDriver;

var Vec2            = require('tiny-ecs').Vec2;
var CollisionSystem = require('./CollisionSystem.js');

/**
 * @constructor
 */
function PlayerDriver(messanger, entities, inputs)
{
  this.entities = entities;
  this.inputs = inputs;

  // dont move after collision
  this.collideFlag = false;

  messanger.listenTo(CollisionSystem.WALL, [],
    this.pauseInput.bind(this));
  messanger.listenTo(CollisionSystem.OUT_OF_BOUNDS, [],
    this.pauseInput.bind(this));
}

PlayerDriver.prototype.pauseInput = function()
{
  this.collideFlag = true;
  setTimeout(function() {
    this.collideFlag = false;
  }.bind(this), 150);
};

PlayerDriver.prototype.update = function(dt, time)
{
  var inputs = this.inputs;

  var up = inputs.button_k_87 || inputs.button_k_38;
  var down = inputs.button_k_83 || inputs.button_k_40;
  var left = inputs.button_k_65 || inputs.button_k_37;
  var right = inputs.button_k_68 || inputs.button_k_39;

  if (up)
    this.movePlayer(PlayerDriver.directions.up);
  if (down)
    this.movePlayer(PlayerDriver.directions.down);
  if (right)
    this.movePlayer(PlayerDriver.directions.right);
  if (left)
    this.movePlayer(PlayerDriver.directions.left);
  if(!up && !down && !left && !right) {
    this.movePlayer(PlayerDriver.directions.stop);
    this.collideFlag = false;
  }
};

PlayerDriver.directions = {
  stop: 0,
  up: 1,
  down: 2,
  left: 3,
  right: 4
};

PlayerDriver.prototype.movePlayer = function(direction)
{
  if (this.collideFlag) return;

  var player = this.entities.queryTag('player')[0];
  var v = player.newtonian.velocity
  var h = player.steering.heading;

  var speed = 25;
  var v     = Vec2.aquire();
  switch (direction) {
    case PlayerDriver.directions.stop:
      h.set(0, 0);
      break;
    case PlayerDriver.directions.up:
      h.add( v.set(0, -speed));
      break;
    case PlayerDriver.directions.down:
      h.add( v.set(0, speed));
      break;
    case PlayerDriver.directions.left:
      h.add( v.set(-speed, 0));
      break;
    case PlayerDriver.directions.right:
      h.add( v.set(speed, 0));
      break;
  }

  h.limit(100);

  Vec2.release(v);
};



