module.exports = HelloActivity;

var Canvas        = require('../lib/renderer/Canvas.js');
var EcsService    = require('./boot/EcsService.js');
var Position      = require('./components/Position.js');
var Spatial       = require('./components/Spatial.js');
var EntityManager = require('tiny-ecs').EntityManager;

/**
 * @constructor
 * @param {Canvas} screen
 * @param {EcsService} ecs
 * @param {EntityManager} entities
 */
function HelloActivity(entities, ecs, screen)
{
  this.screen   = screen;
  this.ecs      = ecs;
  this.entities = entities;
}

HelloActivity.prototype.onStart = function()
{
  var w = this.screen.getSize().x;
  var h = this.screen.getSize().y;

  for (var i = 0; i < 100; i++) {
    var entity = this.entities.createEntity()
      .addComponent(Position)
      .addComponent(Spatial);

    entity.position.x = Math.random()*w - w/2;
    entity.position.y = Math.random()*h - h/2;
  }
};

HelloActivity.prototype.drawBg = function()
{
  var width = this.screen.getSize().x;

  this.screen
    .save()
    .fill('#333')
    .translate(width/2, 100)
    .drawText('Hello, World!', {
      color: '#eee',
      font: '45px sans-serif',
      textAlign: 'center'
    })
    .restore();
};

HelloActivity.prototype.update = function(dt, time)
{
  this.drawBg();
  this.ecs.update(dt, time);
};

