module.exports = main;

var HelloActivity   = require('./HelloActivity.js');
var ActivityManager = require('activities').ActivityManager;
var MODES           = require('activities').Activity.modes;

/**
 * Application entry.
 * @param {ActivityManager} activities
 */
function main(activities)
{
  activities.start(HelloActivity, MODES.SINGLE_INSTANCE | MODES.FLAG_CLEAR_TOP);

  var frames = activities.getFrames();

  var lastTime = 0;

  // Primary game loop
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

  global.requestAnimationFrame(loop);
}

