var C = 5;
var colors = require('./colors.js');

var u = require('./simplify.js').u;
var line = require('./simplify.js').line;
var createGem = require('./simplify.js').createGem;

module.exports = {
  levelObjects:{
    playerStart: {x: u(10)+4*C, y: u(6)},
    levelFinish:{x: u(18), y: u(12)}
  },
  size: { x: 1080, y: 960 },
  startColor: colors.yellow,
  gems: [
  ].concat(createGem(u(1),u(1),colors.green,'1')).
  concat(createGem(u(1),u(13),colors.purple,'2')).
  concat(createGem(u(1),u(15),colors.red,'3')).
  concat(createGem(u(1),u(23),colors.green,'4')).
  concat(createGem(u(4),u(7),colors.red,'5')).
  concat(createGem(u(4),u(23),colors.blue,'6')).
  concat(createGem(u(7),u(23),colors.yellow,'7')).
  concat(createGem(u(9),u(1),colors.red,'7')).
  concat(createGem(u(11),u(1),colors.purple,'7')).
  concat(createGem(u(7),u(5),colors.blue,'7')).
  concat(createGem(u(7),u(7),colors.green,'7')).
  concat(createGem(u(14),u(5),colors.purple,'7')).
  concat(createGem(u(14),u(7),colors.red,'7')).
  concat(createGem(u(7),u(9),colors.blue,'7')).
  concat(createGem(u(7),u(11),colors.yellow,'7')).
  concat(createGem(u(7),u(15),colors.green,'7')).
  concat(createGem(u(14),u(1),colors.yellow,'7')).
  concat(createGem(u(16),u(1),colors.purple,'7')).
  concat(createGem(u(14),u(11),colors.purple,'7')).
  concat(createGem(u(13),u(15),colors.blue,'7')).
  concat(createGem(u(14),u(15),colors.red,'7')).
  concat(createGem(u(17),u(19),colors.green,'7')).
  concat(createGem(u(13),u(23),colors.purple,'7')).
  concat(createGem(u(16),u(7),colors.purple,'7')).
  concat(createGem(u(17)+3*C,u(7),colors.red,'7')).
  concat(createGem(u(18)+6*C,u(7),colors.yellow,'7')).
  concat(createGem(u(20),u(7),colors.blue,'7')).
  concat(createGem(u(17),u(19),colors.green,'7')).
  concat(createGem(u(18)+6*C,u(1),colors.red,'7')).
  concat(createGem(u(20),u(1),colors.blue,'7')).
  concat(createGem(u(23),u(19),colors.red,'7')).
  concat(createGem(u(26)+3*C,u(1),colors.yellow,'7')).
  concat(createGem(u(26)+3*C,u(7),colors.yellow,'7')).
  concat(createGem(u(26)+3*C,u(9),colors.blue,'7')).
  concat(createGem(u(26)+3*C,u(17),colors.yellow,'7')).
  concat(createGem(u(26)+3*C,u(19),colors.blue,'7')).
  concat(createGem(u(24)+3*C,u(23),colors.green,'7')).
  concat(createGem(u(26)+3*C,u(23),colors.yellow,'7'))
  ,
  walls: [
].concat(line(u(3),u(2),C,u(2),colors.red,'r1')).
concat(line(u(12),u(2),C,u(2),colors.purple,'p1')).
concat(line(u(18),u(2),C,u(2),colors.yellow,'y1')).
concat(line(u(24),u(2),C,u(2),colors.purple,'p2')).
concat(line(u(6),u(6),C,u(2),colors.red,'r2')).
concat(line(u(3),u(6),C,u(2),colors.yellow,'y2')).
concat(line(u(15),u(6),C,u(2),colors.blue,'b1')).
concat(line(u(18)+C/2,u(8),u(3)+C/2,C,colors.green,'g5')).
concat(line(u(21),u(6),C,u(2),colors.yellow,'y3')).
concat(line(u(4.5)+C,u(4),u(1.5)+C,C,colors.purple,'p6')).
concat(line(u(10.5),u(4),u(4.5),C,colors.green,'g3')).
concat(line(u(16.5),u(4),u(1.5),C,colors.purple,'p7')).
concat(line(u(19.5),u(4),u(1.5),C,colors.yellow,'y5')).
concat(line(u(22.5),u(4),u(1.5),C,colors.blue,'b5')).
concat(line(u(25.5),u(4),u(1.5),C,colors.yellow,'y6')).
concat(line(u(24),u(16),C,u(4),colors.blue,'b3')).
concat(line(u(12),u(10),C,u(2),colors.yellow,'y4')).
concat(line(u(15),u(10),C,u(2),colors.green,'g1')).
concat(line(u(22.5),u(12),u(1.5),C,colors.red,'r6')).
concat(line(u(25.5),u(12),u(1.5),C,colors.purple,'p8')).
concat(line(u(21),u(12)-C,C,u(4),colors.purple,'p3')).
concat(line(u(1.5),u(8),u(1.5)+C,C,colors.green,'g4')).
concat(line(u(4.5)+C,u(8),u(1.5)+C,C,colors.blue,'b6')).
concat(line(u(10.5),u(8),u(4.5),C,colors.purple,'p5')).
concat(line(u(12),u(14),C,u(2),colors.purple,'p4')).
concat(line(u(1.5),u(12),u(1.5)+C,C,colors.blue,'b7')).
concat(line(u(7.5),u(12),u(4.5)+C,C,colors.green,'g7')).
concat(line(u(13.5),u(12),u(1.5),C,colors.red,'r5')).
concat(line(u(15),u(20),u(3),C,colors.yellow,'y8')).
concat(line(u(21),u(20),u(3),C,colors.yellow,'y9')).
concat(line(u(25.5),u(20),u(1.5),C,colors.green,'g9')).
concat(line(u(12),u(18),C,u(2),colors.red,'r3')).
concat(line(u(18),u(18),C,u(2),colors.red,'r4')).
concat(line(u(1.5),u(16),u(1.5)+C,C,colors.purple,'p6')).
concat(line(u(8),u(16),u(5)+C,C,colors.yellow,'y7')).
concat(line(u(13.5),u(16),u(1.5),C,colors.green,'g6')).
concat(line(u(16.5),u(16),u(1.5),C,colors.purple,'p9')).
concat(line(u(19.5),u(16),u(1.5),C,colors.green,'g8')).
concat(line(u(3),u(20),C,u(4),colors.green,'g2')).
concat(line(u(3),u(14),C,u(2),colors.yellow,'y5')).
concat(line(u(15),u(14),C,u(2),colors.blue,'b2')).
concat(line(u(12),u(22),C,u(2),colors.blue,'b4')).
concat(line(u(18),u(22),C,u(2),colors.purple,'p5'))
};
