module.exports = main;

var ActivityManager  = require('activities').ActivityManager;
var modes            = require('activities').Activity.modes;
var MainGameActivity = require('./MainGameActivitiy.js');

/**
 * Application entry.
 * @param {ActivityManager} activities
 */
function main(activities, debug)
{
  activities.start(MainGameActivity,
    modes.SINGLE_INSTANCE | modes.FLAG_CLEAR_TOP);

  debug.frameTime    = 0;
  debug.loopTime     = 0;

  // Primary game loop
  var frames = activities.getFrames();
  var lastTime = 0;
  function loop(time)
  {
    global.requestAnimationFrame(loop);

    var dt = lastTime ? time - lastTime : 0;
    lastTime = time;

    debug.frameTime = dt;

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

