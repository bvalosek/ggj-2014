module.exports = main;

var ActivityManager  = require('activities').ActivityManager;
var modes            = require('activities').Activity.modes;
var TitleActivity    = require('./TitleActivity.js');

/**
 * Application entry.
 * @param {ActivityManager} activities
 */
function main(inputService, activities)
{
  activities.start(TitleActivity,
    modes.SINGLE_INSTANCE | modes.FLAG_CLEAR_TOP);

  // Primary game loop
  var frames = activities.getFrames();
  var lastTime = 0;
  function loop(time)
  {
    global.requestAnimationFrame(loop);

    var dt = lastTime ? time - lastTime : 0;
    lastTime = time;

    inputService.update(dt, time);

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

