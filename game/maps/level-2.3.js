var C = 5;
var colors = require('./colors.js');
var u = require('./simplify.js').u;
var line = require('./simplify.js').line;
var createGem = require('./simplify.js').createGem;

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
concat( line(u(8),u(4)+C/2, C, u(4)+C/2, colors.blue, 'b1') ).
concat( line(u(8),u(12), C, u(4)+C, colors.yellow, 'y1') ).
concat( line(u(8),u(20), C, u(4), colors.purple, 'p3') ).

concat( line(u(4)+C/2,u(8), u(4)+C/2, C, colors.purple, 'p2') ).
concat( line(u(4)+C/2,u(16),u(4)+C/2, C, colors.green, 'g1') ).

concat( line(u(12),u(8), u(4)+C, C, colors.green, 'g2') ).
concat( line(u(12),u(16),u(4)+C, C, colors.red, 'r2') ).

concat( line(u(20),u(8), u(4), C, colors.yellow, 'y2') ).
concat( line(u(20),u(16),u(4), C, colors.green, 'g3') ).

concat( line(u(16),u(20)-C/2, C, u(4)+C/2, colors.blue, 'b1') ).
concat( line(u(16),u(4)+C/2, C, u(4)+C/2, colors.red, 'r1') ).
concat( line(u(16),u(12), C, u(4)+C, colors.purple, 'p1') )


};
