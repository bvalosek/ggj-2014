module.exports = SpatialIndexer;

var Position      = require('../components/Position.js');
var Spatial       = require('../components/Spatial.js');
var EntityManager = require('tiny-ecs').EntityManager;
var QuadTree      = require('tiny-ecs').QuadTree;
var Vec2          = require('tiny-ecs').Vec2;

/**
 * Keeps a quad-tree up-to-date that allows us to do fast spatial queries for
 * things whose spatials are coincident.
 * @constructor
 * @param {EntityManager} entities
 */
function SpatialIndexer(entities)
{
  this.entities     = entities;
  this.tree         = new QuadTree();
  this.nextSize     = new Vec2();
  this.nextPosition = new Vec2();

  global.tree = this.tree;
  this.tree.size.set(5000,5000);
  this.tree.position.set(-2500,-2500);
}

var FILTER = [Position, Spatial];

/**
 * @param {Number} dt
 * @param {Number} time
 */
SpatialIndexer.prototype.update = function(dt, time)
{
  var nextPos  = this.nextPosition;
  var nextSize = this.nextSize;
  var tree     = this.tree;

  var busted = 0;

  // Loop em
  var entities = this.entities.queryComponents(FILTER);
  for (var n = 0; n < entities.length; n++) {
    var entity = entities[n];
    var loc    = entity.position.location;
    var hwidth = entity.spatial.hwidth;
    var entry  = entity.spatial._entry;

    // If we have a cached entry, find out if it's still good in its node.
    if (entry) {

      // TODO

    } else {
      entity.spatial._entry = tree.insert(entity, loc, hwidth);
    }

    // Check to see if we should resize the quad tree next time
    nextPos.x  = Math.min(nextPos.x, loc.x - hwidth.x);
    nextPos.y  = Math.min(nextPos.y, loc.y - hwidth.y);
    nextSize.x = Math.max(nextSize.x, loc.x + hwidth.x);
    nextSize.y = Math.max(nextSize.y, loc.y + hwidth.y);
  }

  // Update tree for better sizing
  nextSize.sub(nextPos);
};





