module.exports = Renderer;

var EntityManager = require('tiny-ecs').EntityManager;

/**
 * @constructor
 * param
 */
function Renderer(screen, entities)
{
  this.screen   = screen;
  this.entities = entities;
}



