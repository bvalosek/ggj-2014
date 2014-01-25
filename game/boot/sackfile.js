var Container       = require('sack').Container;
var ActivityManager = require('activities').ActivityManager;

// ----------------------------------------------------------------------------
// Our life

var container = new Container();
module.exports = container;
global.container = container;

// ----------------------------------------------------------------------------
// A nice hash object to dump shit into that we can inspect in the console

global.debug = {};
container.register('debug', global.debug);

// ----------------------------------------------------------------------------
// Services

container.make(require('./ScreenService.js'));
container.make(require('./EcsService.js'));
container.make(require('./ActivityService.js'));
container.make(require('./MapService.js'));

