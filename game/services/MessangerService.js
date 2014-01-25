module.exports = MessangerService;

/**
 * @constructor
 */
function MessangerService(container)
{
  container.register('messanger', this);
  this.events = {};
}

// Trigger an event for any callbacks / Component filter combos we have that
// match
MessangerService.prototype.trigger = function(entity, event, option)
{
  var entry = this.events[event];
  if (!entry) return;

  for (var n = 0; n < entry.length; n++) {
    var info       = entry[n];
    var Components = info.Components;
    var callback   = info.callback;

    if (entity.hasAllComponents(Components)) {
      callback(entity, option);
    }
  }
};

// Allows a callback to be fired for a system that is listening to an event
// + Components filter
MessangerService.prototype.listenTo = function(event, Components, callback)
{
  if (!this.events[event])
    this.events[event] = [];

  this.events[event].push({
    Components: Components,
    callback: callback
  });
};


