module.exports = HelloActivity;

/**
 * @constructor
 * @param {EntityManager} entities
 */
function HelloActivity(entities)
{
  this.entities = entities;
}

HelloActivity.prototype.onStart = function()
{
  console.log('Hello, World!');
};

