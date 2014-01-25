module.exports = PlayerDriver;

/**
 * @constructor
 */
function PlayerDriver(entities, inputs)
{
  this.entities = entities;
  this.inputs = inputs;
}

PlayerDriver.prototype.update = function(dt, time)
{
  var inputs = this.inputs;

  if (inputs.button_k_87)
    this.movePlayer(PlayerDriver.directions.up);
  else if (inputs.button_k_83)
    this.movePlayer(PlayerDriver.directions.down);
  else if (inputs.button_k_68)
    this.movePlayer(PlayerDriver.directions.right);
  else if (inputs.button_k_65)
    this.movePlayer(PlayerDriver.directions.left);
  else
    this.movePlayer(PlayerDriver.directions.stop);
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
  var player = this.entities.queryTag('player')[0];
  var v = player.newtonian.velocity
  var h = player.steering.heading;

  var speed = 100;

  switch (direction) {
    case PlayerDriver.directions.stop:
      h.set(0, 0);
      break;
    case PlayerDriver.directions.up:
      h.set(0, -speed);
      break;
    case PlayerDriver.directions.down:
      h.set(0, speed);
      break;
    case PlayerDriver.directions.left:
      h.set(-speed, 0);
      break;
    case PlayerDriver.directions.right:
      h.set(speed, 0);
      break;
  }

};



