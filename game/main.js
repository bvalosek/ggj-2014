module.exports = main;

var ActivityManager = require('activities').ActivityManager;
var modes           = require('activities').Activity.modes;
var HelloActivity   = require('./HelloActivity.js');

/**
 * Application entry.
 * @param {ActivityManager} activities
 */
function main(activities)
{
  activities.start(HelloActivity,
    modes.SINGLE_INSTANCE | modes.FLAG_CLEAR_TOP);

  // Primary game loop
  var frames = activities.getFrames();
  var lastTime = 0;
  function loop(time)
  {
    global.requestAnimationFrame(loop);

    var dt = lastTime ? time - lastTime : 0;
    lastTime = time;

    for (var n = 0; n < frames.length; n++) {
      var activity = frames[n].activity;
      if (activity.update instanceof Function) {
        activity.update(dt, time);
      }
    }
  }

  // Boom.
  global.requestAnimationFrame(loop);
}

