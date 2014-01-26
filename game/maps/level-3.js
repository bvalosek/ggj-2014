var C = 10;
var colors = require('./colors.js');
var mapCX = 1000;
var mapCY = 710;

var u = require('./simplify.js').u;
var line = require('./simplify.js').line;
var createGem = require('./simplify.js').createGem;

module.exports = {
  levelObjects:{
    playerStart: {x: u(12)+C, y: u(8)},
    levelFinish:{x: u(23), y: u(16)}
  },
  size: { x: mapCX, y: mapCY },
  startColor: colors.yellow,
  gems: [].
concat(createGem( u(2),u(11), colors.red)).
concat(createGem( u(2),u(16), colors.purple)).
concat(createGem( u(18),u(11), colors.green)).
concat(createGem( u(22.5),u(3), colors.red)).
concat(createGem( u(8.5),u(3), colors.blue))
,
  walls: [].
concat(line(u(3),u(4),C,u(4),colors.green, 'g1')).
concat( line(u(6.5),u(8),u(4)-C,C,colors.red, 'r1')).
concat( line(u(2.5),u(14),u(2.5),C,colors.red, 'r2')).
concat( line(u(5)-C,u(11)+C,C,u(3),colors.blue, 'b1')).
concat( line(u(5)-C,u(16)-C,C,u(2),colors.purple, 'p1')).
concat( line(u(10),u(11)+C,C,u(3),colors.purple, 'p2')).
concat( line(u(12),u(14),u(2.25),C,colors.green, 'g2')).
concat( line(u(14)+C,u(2),C,u(2),colors.purple, 'p3')).
concat( line(u(14)+C,u(9)-C/2,C,u(5)-C/2,colors.blue, 'b2')).
concat( line(u(14)+C,u(16)-C,C,u(2),colors.green, 'g3')).
concat( line(u(23),u(14),u(2), C,colors.blue, 'b3')).
concat( line(u(16)+C/2,u(4),u(2)+C/2, C,colors.green, 'g4')).
concat( line(u(20)-C,u(7),u(1.5),C,colors.purple, 'p5')).
concat( line(u(18),u(5.5)+C,C,u(1.5),colors.red, 'r5')).
concat( line(u(21),u(11)-C,C,u(3.5),colors.red, 'r4')).
concat( line(u(21),u(16)-C,C,u(2),colors.purple, 'p6'))  
};
