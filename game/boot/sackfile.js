var Container       = require('sack').Container;
var ActivityManager = require('activities').ActivityManager;

// ----------------------------------------------------------------------------
// Our life

var container = new Container();
module.exports = container;
global.container = container;

// ----------------------------------------------------------------------------
// A nice hash object to dump shit into that we can inspect in the console

var debug = global.debug = {};
container.register('debug', global.debug);

// ----------------------------------------------------------------------------
// Services

container.make(require('../services/MessangerService.js'));
container.make(require('../services/ActivityService.js'));
container.make(require('../services/ScreenService.js'));
container.make(require('../services/SoundService.js'));
container.make(require('../services/InputService.js'));

container.make(require('../services/EcsService.js'));
container.make(require('../services/MapService.js'));
container.make(require('../services/PlayerService.js'));
