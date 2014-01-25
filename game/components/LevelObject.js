module.exports = LevelObject;

/**
 * @constructor
 */
function LevelObject()
{
  this.type = null;
}

LevelObject.types = {
  PLAYER_START: 1,
  LEVEL_FINISH: 2,
  GEM: 3
};


