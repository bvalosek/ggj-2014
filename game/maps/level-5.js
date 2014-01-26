var C = 5;
var colors = require('./colors.js');

var u = require('./simplify.js').u;
var line = require('./simplify.js').line;
var createGem = require('./simplify.js').createGem;

module.exports = {
  levelObjects:{
    playerStart: {x: u(15)+3*C, y: u(10)},
    levelFinish:{x: u(2)+3*C, y: u(20)}
  },
  size: { x: 1165, y: 880 },
  startColor: colors.yellow,
  gems: [
  ].concat(createGem(u(2)+3*C,u(4),colors.yellow,'yg1')).
  concat(createGem(u(2)+3*C,u(12),colors.green,'gg1')).
  concat(createGem(u(8)+3*C,u(1),colors.blue,'bg1')).
  concat(createGem(u(8)+3*C,u(8),colors.yellow,'yg2')).
  concat(createGem(u(8)+3*C,u(12),colors.purple,'pg2')).
  concat(createGem(u(8)+3*C,u(18),colors.green,'gg2')).
  concat(createGem(u(8)+3*C,u(4),colors.red,'rg1')).
  concat(createGem(u(14),u(2.5),colors.green,'gg3')).
  concat(createGem(u(17),u(2.5),colors.yellow,'yg3')).
  concat(createGem(u(14),u(8),colors.green,'gg4')).
  concat(createGem(u(14),u(12),colors.red,'rg2')).
  concat(createGem(u(14),u(16),colors.purple,'pg3')).
  concat(createGem(u(14),u(20),colors.blue,'bg1')).
  concat(createGem(u(17),u(8),colors.blue,'bg2')).
  concat(createGem(u(17),u(12),colors.purple,'pg4')).
  concat(createGem(u(17),u(16),colors.yellow,'yg4')).
  concat(createGem(u(24)+3*C,u(1),colors.yellow,'yg5')).
  concat(createGem(u(22),u(8),colors.red,'rg3')).
  concat(createGem(u(27),u(8),colors.blue,'bg3')).
  concat(createGem(u(22),u(12),colors.green,'gg4')).
  concat(createGem(u(27),u(20),colors.purple,'pg5'))
  
  
  ,
  walls: [
].concat(line(u(5),u(5),C,u(5),colors.red,'r1')).
concat(line(u(5),u(12),C,u(2),colors.blue,'b1')).
concat(line(u(12),u(3),C,u(3),colors.green,'g1')).
concat(line(u(12),u(10),C,u(4),colors.purple,'p1')).
concat(line(u(12),u(18),C,u(4),colors.yellow,'o1')).
concat(line(u(5),u(18),C,u(4),colors.purple,'p2')).
concat(line(u(19),u(3),C,u(3),colors.yellow,'o2')).
concat(line(u(19),u(10),C,u(4),colors.green,'g2')).
concat(line(u(19),u(18),C,u(4),colors.purple,'p3')).
concat(line(u(25),u(16),C,u(6),colors.purple,'p4')).
concat(line(u(8.5),u(6),u(3.5)+C,C,colors.blue,'b2')).
concat(line(u(6)+C,u(10),u(6),C,colors.yellow,'o3')).
concat(line(u(6)+C,u(14),u(6),C,colors.green,'g3')).
concat(line(u(15.5),u(6),u(3.5)+C,C,colors.red,'r2')).
concat(line(u(15.5),u(14),u(3.5)+C,C,colors.blue,'b3')).
concat(line(u(24),u(6),u(5)+C,C,colors.blue,'b4')).
concat(line(u(24),u(10),u(5)+C,C,colors.red,'r3'))
};
