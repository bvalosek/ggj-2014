module.exports = ActivityService;

var ActivityManager = require('activities').ActivityManager;

/**
 * @constructor
 */
function ActivityService(container)
{
  var activities = new ActivityManager(function(T) {
    return container.make(T);
  });
  container.shared('activities', activities);
  container.shared('navigator', activities.navigator);
}



