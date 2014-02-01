var colors = require('./colors.js');
var u = require('./simplify.js').u;
var setUnitSize = require('./simplify.js').setUnitSize;
var setWallWidth = require('./simplify.js').setWallWidth;
var setWallUnit = require('./simplify.js').setWallUnit;

var createLine = require('./simplify.js').createLine;
var createGem = require('./simplify.js').createGem;

setUnitSize(40);
setWallUnit(160);
setWallWidth(5);
module.exports = {
  levelObjects:{
    playerStart: {x: u(20), y: u(4)},
    levelFinish:{x: u(4), y: u(4)}
  },
  size: { x: 960, y: 960 },
  startColor: colors.blue,
  gems: [].
concat( createGem(u(20),u(2),colors.red ) ).
concat( createGem(u(20),u(6),colors.yellow ) ).
concat( createGem(u(20),u(12),colors.green ) ).
concat( createGem(u(20),u(20),colors.blue ) ).
concat( createGem(u(4),u(20),colors.purple ) ).
concat( createGem(u(12),u(22),colors.purple ) ).
concat( createGem(u(12),u(18),colors.red ) ).
concat( createGem(u(12),u(4),colors.red ) ).
concat( createGem(u(10),u(12),colors.yellow ) ).
concat( createGem(u(14),u(12),colors.green ) ).
concat( createGem(u(4),u(10),colors.purple ) ).
concat( createGem(u(4),u(14),colors.green ) )
,
  walls: [].
concat( createLine(2, 1, 'v', 1, colors.blue,  'b1') ).
concat( createLine(2, 3, 'v', 1, colors.yellow,'y1') ).
concat( createLine(2, 5, 'v', 1, colors.purple,'p3') ).

concat( createLine(1, 2, 'h', 1, colors.purple,'p2') ).
concat( createLine(1, 4, 'h', 1, colors.green, 'g1') ).
concat( createLine(3, 2, 'h', 1, colors.green, 'g2') ).
concat( createLine(3, 4, 'h', 1, colors.red,   'r2') ).
concat( createLine(5, 2, 'h', 1, colors.yellow,'y2') ).
concat( createLine(5, 4, 'h', 1, colors.green, 'g3') ).

concat( createLine(4, 5, 'v', 1, colors.blue,  'b2') ).
concat( createLine(4, 1, 'v', 1, colors.red,   'r1') ).
concat( createLine(4, 3, 'v', 1, colors.purple,'p1') )

};
