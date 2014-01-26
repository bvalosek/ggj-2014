var C = 5;
var colors = require('./colors.js');
var u = require('./simplify.js').u;
var line = require('./simplify.js').line;
var createGem = require('./simplify.js').createGem;

module.exports = {
  levelObjects:{
    playerStart: {x: u(20), y: u(11)},
    levelFinish:{x: u(4), y: u(20)}
  },
  size: { x: 1280, y: 960 },
  startColor: colors.green,
  gems: [].
concat( createGem(u(20),u(3),colors.blue ) ).
concat( createGem(u(18),u(8),colors.red ) ).
concat( createGem(u(22),u(8),colors.yellow ) ).
concat( createGem(u(20),u(14),colors.blue ) ).
concat( createGem(u(20),u(18),colors.purple ) ).
concat( createGem(u(20),u(22),colors.blue ) ).
concat( createGem(u(28),u(4),colors.green ) ).
concat( createGem(u(28),u(8),colors.red ) ).
concat( createGem(u(28),u(20),colors.green ) ).
concat( createGem(u(12),u(2),colors.yellow ) ).
concat( createGem(u(12),u(4),colors.green ) ).
concat( createGem(u(12),u(8.5),colors.purple ) ).
concat( createGem(u(12),u(15),colors.green ) ).
concat( createGem(u(12),u(20),colors.blue ) ).
concat( createGem(u(4),u(8),colors.green ) )
,
  walls: [].
concat( line(u(4),u(16),u(4), C, colors.green, 'g1') ).
concat( line(u(8),u(8)+C/2,C,u(8)+C/2, colors.yellow, 'y1') ).
concat( line(u(8),u(20)-C/2,C,u(4)+C/2, colors.purple, 'p1') ).

concat( line(u(12)+C,u(6),u(4), C, colors.green, 'g2') ).
concat( line(u(12)+C,u(11),u(4), C, colors.purple, 'p2') ).

concat( line(u(16),u(3)+C/2,C,u(3)+C/2, colors.blue, 'b1') ).
concat( line(u(16),u(8.5),C,u(2.5)+C, colors.red, 'r1') ).
concat( line(u(16),u(13.5),C,u(2.5)+C/2, colors.green, 'g3') ).
concat( line(u(16),u(20),C,u(4), colors.blue, 'b2') ).

concat( line(u(20)+C,u(6),u(4), C, colors.purple, 'p3') ).
concat( line(u(28)-C/2,u(11),u(4)+C/2, C, colors.red, 'r2') ).
concat( line(u(24),u(13.5)-C/2,C,u(2.5)+C/2, colors.blue, 'b3') ).
concat( line(u(24),u(8.5),C,u(2.5)+C, colors.yellow, 'y2') ).

concat( line(u(24),u(3)+C/2,C,u(3)+C/2, colors.green, 'g4') ).
concat( line(u(24),u(20),C,u(4), colors.green, 'g5') ).
concat( line(u(20),u(16)-C/2,u(4)+C, C, colors.purple, 'p4') )
};
