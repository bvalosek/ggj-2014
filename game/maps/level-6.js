var C = 5;
var colors = require('./colors.js');

var u = require('./simplify.js').u;
var line = require('./simplify.js').line;
var createGem = require('./simplify.js').createGem;

module.exports = {
  levelObjects:{
    playerStart: {x: u(2)+3*C, y: u(15)},
    levelFinish:{x: u(28), y: u(2)}
  },
  size: { x: 1000, y: 1000 },
  gems: [
  ].concat(createGem(u(1),u(5),colors.blue,'bg1')).
  concat(createGem(u(1),u(7),colors.red,'rg1')).
  concat(createGem(u(1),u(9),colors.blue,'bg2')).
  concat(createGem(u(1),u(11),colors.purple,'pg1')).
  concat(createGem(u(1),u(13),colors.red,'rg2')).
  concat(createGem(u(1),u(17),colors.yellow,'yg1')).
  concat(createGem(u(1),u(23),colors.green,'gg1')).
  concat(createGem(u(4),u(5),colors.purple,'pg2')).
  concat(createGem(u(4),u(13),colors.blue,'bg3')).
  concat(createGem(u(9),u(1),colors.blue,'bg4')).
  concat(createGem(u(9),u(7),colors.red,'rg3')).
  concat(createGem(u(6),u(11),colors.green,'gg2')).
  concat(createGem(u(11),u(5),colors.blue,'bg5')).
  concat(createGem(u(14),u(7),colors.yellow,'yg2')).
  concat(createGem(u(11),u(11),colors.green,'gg3')).
  concat(createGem(u(14),u(17),colors.blue,'bg6')).
  concat(createGem(u(16),u(17),colors.purple,'pg3')).
  concat(createGem(u(18),u(1),colors.red,'rg4')).
  concat(createGem(u(30),u(7),colors.red,'rg5')).
  concat(createGem(u(30),u(11),colors.blue,'bg7')).
  concat(createGem(u(26),u(17),colors.purple,'pg4')).
  concat(createGem(u(30),u(17),colors.red,'rg6')).
  concat(createGem(u(30),u(23),colors.blue,'bg8'))
  ,
  walls: [
].
concat(line(u(5),u(3),C,u(3),colors.blue,'b1')).
concat(line(u(10),u(3),C,u(3),colors.red,'r1')).
concat(line(u(25),u(3),C,u(3),colors.blue,'b2')).
concat(line(u(5),u(9)-C,C,u(3),colors.red,'r2')).
concat(line(u(15),u(9)-C,C,u(3),colors.red,'r3')).
concat(line(u(15),u(6),u(10),C,colors.green,'g2')).
concat(line(u(10),u(9)-C,C,u(3),colors.yellow,'y1')).
concat(line(u(5),u(12),u(5),C,colors.blue,'b3')).
concat(line(u(12.5),u(12),u(2.5),C,colors.green,'g3')).
concat(line(u(5),u(15)-C,C,u(3),colors.yellow,'y2')).
concat(line(u(25),u(15)-C,C,u(3),colors.red,'r4')).
concat(line(u(20),u(12),u(5),C,colors.blue,'b4')).
concat(line(u(28),u(12),u(3),C,colors.purple,'p2')).
concat(line(u(2.5),u(6),u(2.5),C,colors.purple,'p1')).
concat(line(u(28),u(6),u(3),C,colors.yellow,'y3')).
concat(line(u(2.5),u(18),u(2.5),C,colors.red,'r5')).
concat(line(u(19),u(21),C,u(3),colors.green,'g1')).
concat(line(u(12),u(18),u(7),C,colors.purple,'p3')).
concat(line(u(25),u(18),u(6),C,colors.blue,'b5'))
};
