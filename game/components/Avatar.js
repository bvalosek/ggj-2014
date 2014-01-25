module.exports = Avatar;

/**
 * A player / enemy / person or something
 * @constructor
 */
function Avatar()
{
  this.type = Avatar.types.NONE;
}

Avatar.types = {
  NONE: 0,
  PLAYER: 1,
  ENEMY: 2
}

Avatar.prototype.__init = function()
{
  this.type = Avatar.types.NONE;
};



