var Container       = require('sack').Container;
var ActivityManager = require('activities').ActivityManager;
var EntityManager   = require('tiny-ecs').EntityManager;

var container = new Container();
module.exports = container;

global.container = container;

function factory(T) { return container.make(T); }

// ----------------------------------------------------------------------------
// Activities

var activities = new ActivityManager(factory);
container.shared('activities', activities);
container.shared('navigator', activities.navigator);

// ----------------------------------------------------------------------------
// ECS

var entities = new EntityManager(factory);
container.shared('entities', entities);
