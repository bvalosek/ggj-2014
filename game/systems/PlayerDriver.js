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
    console.log('up');
  if (inputs.button_k_83)
    console.log('down');
  if (inputs.button_k_68)
    console.log('right');
  if (inputs.button_k_65)
    console.log('left');
};



